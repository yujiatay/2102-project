import { DatePopularity, TimeslotPopularity } from '../types/analytics';
import db from './db';

/**
 * Gets aggregated popularity data for each day.
 */
export function getDatePopularity(username: string, min?: number, max?: number): Promise<DatePopularity[]> {
  return db.getAll(`
    WITH bk AS (SELECT * FROM Bookings WHERE rusername = $1 AND booking_date >= $2 AND booking_date <= $3)
    SELECT B.date, B.bookings, B2.confirmed_bookings,
      B.total_pax, B2.total_confirmed_pax, B.mean_pax, B2.mean_confirmed_pax
    FROM (
      SELECT booking_date / 86400000 * 86400000 AS date, COUNT(*) AS bookings,
        SUM(pax) AS total_pax, AVG(pax) AS mean_pax
      FROM bk GROUP BY booking_date / 86400000 * 86400000
    ) B NATURAL JOIN (
      SELECT booking_date / 86400000 * 86400000 AS date, COUNT(*) AS confirmed_bookings,
        SUM(pax) AS total_confirmed_pax, AVG(pax) AS mean_confirmed_pax
      FROM bk WHERE is_confirmed = TRUE GROUP BY booking_date / 86400000 * 86400000
    ) B2
    ORDER BY B.date ASC
  `, [username, min || Date.now() - 2592000000, max || Date.now()]);
}

/**
 * Gets aggregated popularity data for each time slot.
 */
export function getTimeslotPopularity(username: string, min?: number, max?: number): Promise<TimeslotPopularity[]> {
  return db.getAll(`
    WITH bk AS (SELECT * FROM Bookings WHERE rusername = $1 AND booking_date >= $2 AND booking_date <= $3)
    SELECT B.day_of_week, B.start_time, B.end_time, B.bookings, B2.confirmed_bookings,
      B.total_pax, B2.total_confirmed_pax, B.mean_pax, B2.mean_confirmed_pax
    FROM (
      SELECT day_of_week, start_time, end_time, COUNT(*) AS bookings,
        SUM(pax) AS total_pax, AVG(pax) AS mean_pax
      FROM bk GROUP BY day_of_week, start_time, end_time
    ) B NATURAL JOIN (
      SELECT day_of_week, start_time, end_time, COUNT(*) AS confirmed_bookings,
        SUM(pax) AS total_confirmed_pax, AVG(pax) AS mean_confirmed_pax
      FROM bk WHERE is_confirmed = TRUE GROUP BY day_of_week, start_time, end_time
    ) B2
  `, [username, min || Date.now() - 2592000000, max || Date.now()]);
}
