import * as bcrypt from 'bcrypt';
import { PASSWORD_SALT_ROUNDS } from '../constants';
import { Bookmark, Diner, DinerPrivate, DinerWithPassword } from '../types/diner';
import { generateCode } from '../utils/strings';
import db from './db';

/**
 * Adds a bookmark for the given diner and restaurant.
 */
export function addBookmark(dusername: string, rusername: string): Promise<Bookmark> {
  return db.getOne<Bookmark>(`
    INSERT INTO Bookmarks (dusername, rusername) VALUES ($1, $2) RETURNING *
  `, [dusername, rusername]) as Promise<Bookmark>;
}

/**
 * Adds a new diner.
 */
export async function addDiner(username: string, password: string, email: string,
                               code: string | null): Promise<DinerPrivate | null> {
  const passwordHash = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
  const referralCode = generateCode(12);
  const referrer = code ? await getDinerByReferralCode(code) : null;

  return db.getOne<DinerPrivate>(`
    INSERT INTO Diners (username, password, email, referralCode, referrer)
    VALUES ($1, $2, $3, $4, $5) RETURNING username, email, createdAt, points, referralCode, referrer
  `, [username, passwordHash, email, referralCode, referrer]);
}

/**
 * Gets the diner with the given username.
 */
export function getDinerByUsername(username: string): Promise<Diner | null> {
  return db.getOne(`SELECT username, createdAt FROM Diners WHERE username = $1`, [username]);
}

/**
 * Gets the full diner data of the diner with the given username.
 */
export function getDinerWithPassword(username: string): Promise<DinerWithPassword | null> {
  return db.getOne(`SELECT * FROM Diners WHERE username = $1`, [username]);
}

/**
 * Gets the private diner data of the diner with the given username.
 */
export function getDinerWithPrivateData(username: string): Promise<DinerPrivate | null> {
  return db.getOne(`
    SELECT username, email, createdAt, points, referralCode, referrer FROM Diners WHERE username = $1
   `, [username]);
}

/**
 * Gets the diner with the given referral code.
 */
export function getDinerByReferralCode(referralCode: string): Promise<Diner | null> {
  return db.getOne(`SELECT username, createdAt FROM Diners WHERE referralCode = $1`, [referralCode]);
}

/**
 * Checks if the given diner has bookmarked the given restaurant.
 */
export async function isRestaurantBookmarked(dusername: string, rusername: string): Promise<boolean> {
  const result = await db.getOne(`
    SELECT 1 FROM Bookmarks WHERE dusername = $1 AND rusername = $2
  `, [dusername, rusername]);
  return !!result;
}

/**
 * Removes the given restaurant as a bookmark of the given diner.
 */
export function removeBookmark(dusername: string, rusername: string): Promise<{}> {
  return db.query(`
    DELETE FROM Bookmarks WHERE dusername = $1 AND rusername = $2
  `, [dusername, rusername]);
}
