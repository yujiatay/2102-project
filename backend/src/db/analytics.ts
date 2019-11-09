import { DatePopularity, TimeslotPopularity } from '../types/analytics';
import db from './db';

/**
 * Gets aggregated popularity data for each date.
 */
export function getDatePopularity(username: string, min: string, max: string): Promise<DatePopularity[]> {
  return db.getAll(`
    WITH bk AS (SELECT * FROM Bookings WHERE rusername = $1 AND booking_date >= $2 AND booking_date <= $3)
    SELECT B.date, B.bookings, B2.confirmedBookings,
      B.totalPax, B2.totalConfirmedPax, B.meanPax, B2.meanConfirmedPax
    FROM (
      SELECT booking_date AS date, COUNT(*) AS bookings,
        SUM(pax) AS totalPax, AVG(pax) AS meanPax
      FROM bk GROUP BY date
    ) B NATURAL JOIN (
      SELECT booking_date AS date, COUNT(*) AS confirmedBookings,
        SUM(pax) AS totalConfirmedPax, AVG(pax) AS meanConfirmedPax
      FROM bk WHERE is_confirmed = TRUE GROUP BY date
    ) B2
    ORDER BY B.date ASC
  `, [username, min, max]);
}

/**
 * Gets aggregated popularity data for each time slot.
 */
export function getTimeslotPopularity(username: string, min: string, max: string): Promise<TimeslotPopularity[]> {
  return db.getAll(`
    WITH bk AS (SELECT * FROM Bookings WHERE rusername = $1 AND booking_date >= $2 AND booking_date <= $3)
    SELECT B.day_of_week, B.start_time, B.end_time, B.bookings, B2.confirmedBookings,
      B.totalPax, B2.totalConfirmedPax, B.meanPax, B2.meanConfirmedPax
    FROM (
      SELECT day_of_week, start_time, end_time, COUNT(*) AS bookings,
        SUM(pax) AS totalPax, AVG(pax) AS meanPax
      FROM bk GROUP BY day_of_week, start_time, end_time
    ) B NATURAL JOIN (
      SELECT day_of_week, start_time, end_time, COUNT(*) AS confirmedBookings,
        SUM(pax) AS totalConfirmedPax, AVG(pax) AS meanConfirmedPax
      FROM bk WHERE is_confirmed = TRUE GROUP BY day_of_week, start_time, end_time
    ) B2
  `, [username, min, max]);
}
