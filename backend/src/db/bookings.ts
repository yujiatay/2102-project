import { Booking } from '../types/booking';
import { AvailableSlot } from '../types/restaurant';
import db from './db';

const BOOKING_LIST_LIMIT = 20;
const UPCOMING_LIST_TIME_BUFFER = 60 * 60 * 1000;

/**
 * Adds a new booking.
 */
export function addBooking(dusername: string, rusername: string, dayOfWeek: number, startTime: string, endTime: string,
                           date: number, pax: number, message: string): Promise<Booking> {
  return db.getOne(`
    INSERT INTO Bookings (dusername, rusername, dayOfWeek, startTime, endTime, bookingDate, pax, message)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
  `, [dusername, rusername, dayOfWeek, startTime, endTime, date, pax, message]) as Promise<Booking>;
}

/**
 * Adds a new available slot for the given restaurant.
 */
export function addAvailableSlot(rusername: string, dayOfWeek: number,
                                 startTime: string, endTime: string): Promise<AvailableSlot> {
  return db.getOne(`
    INSERT INTO AvailableSlots (username, dayOfWeek, startTime, endTime) VALUES ($1, $2, $3, $4) RETURNING *
  `, [rusername, dayOfWeek, startTime, endTime]) as Promise<AvailableSlot>;
}

/**
 * Marks the given booking as confirmed.
 */
export function confirmBooking(booking: Booking): Promise<{}> {
  return db.query(`
    UPDATE Bookings SET isConfirmed = TRUE
    WHERE rusername = $1 AND dusername = $2 AND dayOfWeek = $3 AND startTime = $4 AND endTime = $5 AND bookingDate = $6
  `,
    [booking.rusername, booking.dusername, booking.dayOfWeek, booking.startTime, booking.endTime, booking.bookingDate]);
}

/**
 * Deletes an available slot for the given restaurant.
 */
export function deleteAvailableSlot(rusername: string, dayOfWeek: number,
                                    startTime: string, endTime: string): Promise<{}> {
  return db.query(`
    DELETE FROM AvailableSlots WHERE username = $1 AND dayOfWeek = $2 AND startTime = $3 AND endTime = $4
  `, [rusername, dayOfWeek, startTime, endTime]);
}

/**
 * Deletes the given booking.
 */
export function deleteBooking(booking: Booking): Promise<{}> {
  return db.query(`
    DELETE FROM Bookings
    WHERE rusername = $1 AND dusername = $2 AND dayOfWeek = $3 AND startTime = $4 AND endTime = $5 AND bookingDate = $6
  `,
    [booking.rusername, booking.dusername, booking.dayOfWeek, booking.startTime, booking.endTime, booking.bookingDate]);
}

/**
 * Gets the booking by the given diner for the given restaurant and with the given time slot details.
 */
export function getBooking(dusername: string, rusername: string, dayOfWeek: number,
                           startTime: string, endTime: string, date: number): Promise<Booking | null> {
  return db.getOne(`
    SELECT * FROM Bookings WHERE dusername = $1 AND rusername = $2 AND dayOfWeek = $3
      AND startTime = $4 AND endTime = $5 AND bookingDate = $6
  `, [dusername, rusername, dayOfWeek, startTime, endTime, date]);
}

/**
 * Gets all available slots of the given restaurant.
 */
export function getRestaurantSlots(rusername: string): Promise<AvailableSlot[]> {
  return db.getAll(`
    SELECT * FROM AvailableSlots WHERE username = $1
  `, [rusername]);
}

/**
 * Gets upcoming bookings made by the given diner.
 */
export function getUpcomingBookingsByDiner(dusername: string, prev?: number): Promise<Booking[]> {
  return db.getAll(`
    SELECT * FROM Bookings WHERE dusername = $1 AND createdAt > $2 ORDER BY createdAt ASC LIMIT ${BOOKING_LIST_LIMIT}
  `, [dusername, prev || Date.now() - UPCOMING_LIST_TIME_BUFFER]);
}

/**
 * Gets upcoming bookings on the given restaurant.
 */
export function getUpcomingBookingsOnRestaurant(rusername: string, prev?: number): Promise<Booking[]> {
  return db.getAll(`
    SELECT * FROM Bookings WHERE rusername = $1 AND createdAt > $2 ORDER BY createdAt ASC LIMIT ${BOOKING_LIST_LIMIT}
  `, [rusername, prev || Date.now() - UPCOMING_LIST_TIME_BUFFER]);
}
