import db from './db';

/**
 * Checks if the email is available to be used.
 */
export async function isEmailAvailable(email: string): Promise<boolean> {
  const result = await db.query(`
    SELECT 1 FROM Restaurants WHERE email = ? UNION SELECT 1 FROM Diners WHERE email = ?
  `, [email, email]);

  return !result.rowCount;
}

/**
 * Checks if the username is available to be used.
 */
export async function isUsernameAvailable(username: string): Promise<boolean> {
  const result = await db.query(`
    SELECT 1 FROM Restaurants WHERE username = ? UNION SELECT 1 FROM Diners WHERE username = ?
  `, [username, username]);

  return !result.rowCount;
}
