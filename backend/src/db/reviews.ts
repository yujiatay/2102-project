import { Review } from '../types/review';
import db from './db';

const REVIEW_LIST_LIMIT = 20;

/**
 * Adds a new review.
 */
export function addReview(rusername: string, dusername: string, comment: string, rating: number): Promise<Review> {
  return db.getOne(`
    INSERT INTO Reviews (rusername, dusername, comment, rating) VALUES ($1, $2, $3, $4) RETURNING *
  `, [rusername, dusername, comment, rating]) as Promise<Review>;
}

/**
 * Deletes the given review.
 */
export function deleteReview(review: Review): Promise<{}> {
  return db.query(`
    DELETE FROM Reviews WHERE rusername = $1 AND dusername = $2
  `, [review.rusername, review.dusername]);
}

/**
 * Gets the most recent reviews on the given restaurant.
 */
export function getRecentReviewsByRestaurant(username: string, prev?: number): Promise<Review[]> {
  return db.getAll(`
    SELECT * FROM Reviews WHERE rusername = $1 AND created_at < $2 ORDER BY created_at DESC LIMIT ${REVIEW_LIST_LIMIT}
  `, [username, prev || Date.now()]);
}

/**
 * Gets the review on the given restaurant made by the given diner.
 */
export function getReview(rusername: string, dusername: string): Promise<Review | null> {
  return db.getOne(`
    SELECT * FROM Reviews WHERE rusername = $1 AND dusername = $2
  `, [rusername, dusername]);
}

/**
 * Updates the comment and rating of the given review.
 */
export function updateReview(review: Review, comment: string, rating: number): Promise<Review | null> {
  return db.getOne(`
    UPDATE Reviews SET (comment, rating, updated_at) = ($1, $2, NOW())
    WHERE rusername = $3 AND dusername = $4 RETURNING *
  `, [comment, rating, review.rusername, review.dusername]);
}
