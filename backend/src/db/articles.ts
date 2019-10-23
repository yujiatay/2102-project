import db from './db';

/**
 * Gets a list of xxx.
 */
export async function getXxx(): Promise<any[]> {
  const result = await db.query('SELECT * FROM xxx;');
  return result.rows;
}
