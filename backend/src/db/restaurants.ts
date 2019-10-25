import * as bcrypt from 'bcrypt';

import { PASSWORD_SALT_ROUNDS } from '../constants';
import {
  CuisineType,
  Restaurant,
  RestaurantPrivate,
  RestaurantTag,
  RestaurantWithPassword,
  Tag
} from '../types/restaurant';
import db from './db';

const RESTAURANT_LIST_LIMIT = 20;

/**
 * Adds a new restaurant.
 */
export async function addRestaurant(username: string, password: string, email: string,
                                    name: string, cuisineType: CuisineType, branchLocation: string,
                                    openingHours: string, capacity: number): Promise<RestaurantPrivate | null> {
  const passwordHash = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);

  return db.getOne<RestaurantPrivate>(`
    INSERT INTO Restaurants (username, password, email, name, cuisineType, branchLocation, openingHours, capacity)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    RETURNING username, name, email, cuisineType, branchLocation, openingHours, capacity, createdAt
  `, [username, passwordHash, email, name, cuisineType, branchLocation, openingHours, capacity]);
}

/**
 * Adds a new tag.
 */
export function addTag(name: string): Promise<Tag> {
  return db.getOne<Tag>(`INSERT INTO Tags (name) VALUES (?) RETURNING *`, [name]) as Promise<Tag>;
}

/**
 * Gets the newest restaurants.
 */
export function getNewestRestaurants(prev?: number): Promise<Restaurant[]> {
  return db.getAll(`
    SELECT username, name, cuisineType, branchLocation, openingHours, capacity, createdAt
    FROM Restaurants WHERE createdAt < ? ORDER BY createdAt DESC LIMIT ${RESTAURANT_LIST_LIMIT}
  `, [prev || Date.now()]);
}

/**
 * Gets the restaurant with the given username.
 */
export function getRestaurantByUsername(username: string): Promise<Restaurant | null> {
  return db.getOne(`
    SELECT username, name, cuisineType, branchLocation, openingHours, capacity, createdAt
    FROM Restaurants WHERE username = ?
  `, [username]);
}

/**
 * Gets the full restaurant data of the restaurant with the given username.
 */
export function getRestaurantWithPassword(username: string): Promise<RestaurantWithPassword | null> {
  return db.getOne(`SELECT * FROM Restaurants WHERE username = ?`, [username]);
}

/**
 * Gets the private restaurant data of the restaurant with the given username.
 */
export function getRestaurantWithPrivateData(username: string): Promise<RestaurantPrivate | null> {
  return db.getOne(`
    SELECT username, email, name, cuisineType, branchLocation, openingHours, capacity, createdAt
    FROM Restaurants WHERE username = ?
  `, [username]);
}

/**
 * Gets all restaurant tags of the given restaurant.
 */
export function getRestaurantTags(username: string): Promise<RestaurantTag[]> {
  return db.getAll(`SELECT * FROM RestaurantTags WHERE username = ?`, [username]);
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
      SELECT * FROM RestaurantTags WHERE username = ?
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
        await client.query(`DELETE FROM RestaurantTags WHERE username = ? AND tag = ?`, [username, tag]);
      } else if (tagDict[tag] === 1) {
        await client.query(`INSERT INTO RestaurantTags (username, tag) VALUES (?, ?)`, [username, tag]);
      }
    }

    return client.getAll<RestaurantTag>(`SELECT * FROM RestaurantTags WHERE username = ?`, [username]);
  });
}

/**
 * Updates the restaurant with the given username.
 */
export async function updateRestaurant(username: string, name: string, cuisineType: CuisineType, branchLocation: string,
                                       openingHours: string, capacity: number): Promise<RestaurantPrivate | null> {
  return db.getOne(`
    UPDATE Restaurants SET (name, cuisineType, branchLocation, openingHours, capacity) = (?, ?, ?, ?, ?)
    WHERE username = ?
  `, [name, cuisineType, branchLocation, openingHours, capacity, username]);
}
