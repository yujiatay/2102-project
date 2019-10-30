import db from './db';

/**
 * Checks if the email is available to be used.
 */
export async function isEmailAvailable(email: string): Promise<boolean> {
  const result = await db.query(`
    SELECT 1 FROM Restaurants WHERE email = $1 UNION SELECT 1 FROM Diners WHERE email = $2
  `, [email, email]);

  return !result.rowCount;
}

/**
 * Checks if the username is available to be used.
 */
export async function isUsernameAvailable(username: string): Promise<boolean> {
  const result = await db.query(`
    SELECT 1 FROM Restaurants WHERE username = $1 UNION SELECT 1 FROM Diners WHERE username = $2
  `, [username, username]);

  return !result.rowCount;
}
