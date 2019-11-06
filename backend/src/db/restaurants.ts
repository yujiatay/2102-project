import * as bcrypt from 'bcrypt';

import { PASSWORD_SALT_ROUNDS } from '../constants';
import {
  CuisineType,
  MenuItem,
  Restaurant,
  RestaurantPrivate,
  RestaurantTag,
  RestaurantWithPassword,
  Tag
} from '../types/restaurant';
import db from './db';

const RESTAURANT_LIST_LIMIT = 20;

/**
 * Adds a new menu item for the given restaurant.
 */
export function addMenuItem(username: string, name: string, type: string, price: number, description: string,
                            image: string): Promise<MenuItem> {
  return db.getOne<MenuItem>(`
    INSERT INTO MenuItems (username, name, type, price, description, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
  `, [username, name, type, price, description, image]) as Promise<MenuItem>;
}

/**
 * Adds a new restaurant.
 */
export async function addRestaurant(username: string, password: string, email: string,
                                    name: string, cuisineType: CuisineType, branchLocation: string,
                                    openingHours: string, capacity: number): Promise<RestaurantPrivate | null> {
  const passwordHash = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);

  return db.getOne<RestaurantPrivate>(`
    INSERT INTO Restaurants (username, password, email, name, cuisine_type, branch_location, opening_hours, capacity)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING username, name, email, cuisine_type, branch_location, opening_hours, capacity, created_at
  `, [username, passwordHash, email, name, cuisineType, branchLocation, openingHours, capacity]);
}

/**
 * Adds a new tag.
 */
export function addTag(name: string): Promise<Tag> {
  return db.getOne<Tag>(`INSERT INTO Tags (name) VALUES ($1) RETURNING *`, [name]) as Promise<Tag>;
}

/**
 * Deletes the given menu item.
 */
export function deleteMenuItem(username: string, name: string): Promise<{}> {
  return db.query(`DELETE FROM MenuItems WHERE username = $1 AND name = $2`, [username, name]);
}

/**
 * Gets all menu items belonging to the given restaurant.
 */
export function getMenuItems(username: string): Promise<MenuItem[]> {
  return db.getAll(`SELECT * FROM MenuItems WHERE username = $1`, [username]);
}

/**
 * Gets the newest restaurants.
 */
export function getNewestRestaurants(name?: string, cuisineTypes?: number[], tags?: string[],
                                     budget?: number, prev?: number): Promise<Restaurant[]> {
  const noName = name ? 0 : 1;
  const noCuisineTypes = cuisineTypes && cuisineTypes.length > 0 ? 0 : 1;
  const noTags = tags && tags.length > 0 ? 0 : 1;
  const noBudget = budget !== undefined && budget !== null && budget > 0 ? 0 : 1;

  return db.getAll(`
    SELECT username, name, cuisine_type, branch_location, opening_hours, capacity, created_at
    FROM Restaurants R
    WHERE (1 = $1 OR name ILIKE $2) AND (1 = $3 OR cuisine_type = ANY ($4)) AND (1 = $5 OR 1 = ANY (
      SELECT (CASE WHEN T.tag = ANY ($6) THEN 1 ELSE 0 END) FROM RestaurantTags T WHERE T.username = R.username
    )) AND (1 = $7 OR (
      SELECT AVG(price) FROM MenuItems M WHERE R.username = M.username AND M.type = 'main'
    ) <= $8) AND created_at < $9
    ORDER BY created_at DESC
    LIMIT ${RESTAURANT_LIST_LIMIT}
  `, [noName, name, noCuisineTypes, cuisineTypes, noTags, tags, noBudget, budget, new Date(prev || Date.now())]);
}

/**
 * Gets all recommended restaurants.
 */
export function getRecommendedRestaurants(username: string): Promise<Restaurant[]> {
  return db.getAll(`
    WITH triple AS (SELECT B1.rusername AS r1, B2.rusername AS r2, B3.rusername AS r3, B1.dusername AS diner
      FROM Bookings B1, Bookings B2, Bookings B3
      WHERE B1.dusername = B2.dusername AND B2.dusername = B3.dusername
        AND B1.rusername < B2.rusername AND B2.rusername < B3.rusername
        AND B1.is_confirmed AND B2.is_confirmed AND B3.is_confirmed),
    common AS (SELECT T2.diner AS diner
      FROM triple T1, triple T2
      WHERE T1.diner = $1 AND T2.diner != $1 AND T1.r1 = T2.r1 AND T1.r2 = T2.r2 AND T1.r3 = T2.r3)
    SELECT username, name, cuisine_type, branch_location, opening_hours, capacity, created_at
    FROM (
      SELECT diner, rusername
      FROM common C JOIN Bookings B ON C.diner = B.dusername AND B.is_confirmed = TRUE
      WHERE B.rusername NOT IN (SELECT B2.rusername FROM Bookings B2 WHERE B2.dusername = $1 AND B2.is_confirmed)
      GROUP BY diner, rusername
    ) AS T JOIN Restaurants R ON T.rusername = R.username
    GROUP BY R.username
    ORDER BY COUNT(*) DESC
    LIMIT 5
  `, [username]);
}

/**
 * Gets the restaurant with the given username.
 */
export function getRestaurantByUsername(username: string): Promise<Restaurant | null> {
  return db.getOne(`
    SELECT username, name, cuisine_type, branch_location, opening_hours, capacity, created_at
    FROM Restaurants WHERE username = $1
  `, [username]);
}

/**
 * Gets the full restaurant data of the restaurant with the given username.
 */
export function getRestaurantWithPassword(username: string): Promise<RestaurantWithPassword | null> {
  return db.getOne(`SELECT * FROM Restaurants WHERE username = $1`, [username]);
}

/**
 * Gets the private restaurant data of the restaurant with the given username.
 */
export function getRestaurantWithPrivateData(username: string): Promise<RestaurantPrivate | null> {
  return db.getOne(`
    SELECT username, email, name, cuisine_type, branch_location, opening_hours, capacity, created_at
    FROM Restaurants WHERE username = $1
  `, [username]);
}

/**
 * Gets all restaurant tags of the given restaurant.
 */
export function getRestaurantTags(username: string): Promise<RestaurantTag[]> {
  return db.getAll(`SELECT * FROM RestaurantTags WHERE username = $1`, [username]);
}

/**
 * Gets all tags.
 */
export function getTags(): Promise<Tag[]> {
  return db.getAll(`SELECT * FROM Tags`);
}

/**
 * Updates the restaurant tags of the given restaurant.
 */
export async function setRestaurantTags(username: string, tags: string[]): Promise<RestaurantTag[]> {
  return db.withTransaction(async (client) => {
    const initialTags = await client.getAll<RestaurantTag>(`
      SELECT * FROM RestaurantTags WHERE username = $1
    `, [username]);

    const tagDict: { [key: string]: number } = {};
    for (const initialTag of initialTags) {
      tagDict[initialTag.tag] = -1;
    }

    for (const newTag of tags) {
      if (tagDict[newTag] === undefined) {
        tagDict[newTag] = 1;
      } else if (tagDict[newTag] === -1) {
        tagDict[newTag] = 0;
      }
    }

    for (const tag in tagDict) {
      if (tagDict[tag] === -1) {
        await client.query(`DELETE FROM RestaurantTags WHERE username = $1 AND tag = $2`, [username, tag]);
      } else if (tagDict[tag] === 1) {
        await client.query(`INSERT INTO RestaurantTags (username, tag) VALUES ($1, $2)`, [username, tag]);
      }
    }

    return client.getAll<RestaurantTag>(`SELECT * FROM RestaurantTags WHERE username = $1`, [username]);
  });
}

/**
 * Updates the restaurant with the given username.
 */
export async function updateRestaurant(username: string, name: string, cuisineType: CuisineType, branchLocation: string,
                                       openingHours: string, capacity: number): Promise<RestaurantPrivate | null> {
  return db.getOne(`
    UPDATE Restaurants SET (name, cuisine_type, branch_location, opening_hours, capacity) = ($1, $2, $3, $4, $5)
    WHERE username = $6
  `, [name, cuisineType, branchLocation, openingHours, capacity, username]);
}
