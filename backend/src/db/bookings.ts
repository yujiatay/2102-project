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
    VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *
  `, [dusername, rusername, dayOfWeek, startTime, endTime, date, pax, message]) as Promise<Booking>;
}

/**
 * Adds a new available slot for the given restaurant.
 */
export function addAvailableSlot(rusername: string, dayOfWeek: number,
                                 startTime: string, endTime: string): Promise<AvailableSlot> {
  return db.getOne(`
    INSERT INTO AvailableSlots (username, dayOfWeek, startTime, endTime) VALUES (?, ?, ?, ?) RETURNING *
  `, [rusername, dayOfWeek, startTime, endTime]) as Promise<AvailableSlot>;
}

/**
 * Marks the given booking as confirmed.
 */
export function confirmBooking(booking: Booking): Promise<{}> {
  return db.query(`
    UPDATE Bookings SET isConfirmed = TRUE
    WHERE rusername = ? AND dusername = ? AND dayOfWeek = ? AND startTime = ? AND endTime = ? AND bookingDate = ?
  `,
    [booking.rusername, booking.dusername, booking.dayOfWeek, booking.startTime, booking.endTime, booking.bookingDate]);
}

/**
 * Deletes an available slot for the given restaurant.
 */
export function deleteAvailableSlot(rusername: string, dayOfWeek: number,
                                    startTime: string, endTime: string): Promise<{}> {
  return db.query(`
    DELETE FROM AvailableSlots WHERE username = ? AND dayOfWeek = ? AND startTime = ? AND endTime = ?
  `, [rusername, dayOfWeek, startTime, endTime]);
}

/**
 * Deletes the given booking.
 */
export function deleteBooking(booking: Booking): Promise<{}> {
  return db.query(`
    DELETE FROM Bookings
    WHERE rusername = ? AND dusername = ? AND dayOfWeek = ? AND startTime = ? AND endTime = ? AND bookingDate = ?
  `,
    [booking.rusername, booking.dusername, booking.dayOfWeek, booking.startTime, booking.endTime, booking.bookingDate]);
}

/**
 * Gets the booking by the given diner for the given restaurant and with the given time slot details.
 */
export function getBooking(dusername: string, rusername: string, dayOfWeek: number,
                           startTime: string, endTime: string, date: number): Promise<Booking | null> {
  return db.getOne(`
    SELECT * FROM Bookings WHERE dusername = ? AND rusername = ? AND dayOfWeek = ?
      AND startTime = ? AND endTime = ? AND bookingDate = ?
  `, [dusername, rusername, dayOfWeek, startTime, endTime, date]);
}

/**
 * Gets all available slots of the given restaurant.
 */
export function getRestaurantSlots(rusername: string): Promise<AvailableSlot[]> {
  return db.getAll(`
    SELECT * FROM AvailableSlots WHERE username = ?
  `, [rusername]);
}

/**
 * Gets upcoming bookings made by the given diner.
 */
export function getUpcomingBookingsByDiner(dusername: string, prev?: number): Promise<Booking[]> {
  return db.getAll(`
    SELECT * FROM Bookings WHERE dusername = ? AND createdAt > ? ORDER BY createdAt ASC LIMIT ${BOOKING_LIST_LIMIT}
  `, [dusername, prev || Date.now() - UPCOMING_LIST_TIME_BUFFER]);
}

/**
 * Gets upcoming bookings on the given restaurant.
 */
export function getUpcomingBookingsOnRestaurant(rusername: string, prev?: number): Promise<Booking[]> {
  return db.getAll(`
    SELECT * FROM Bookings WHERE rusername = ? AND createdAt > ? ORDER BY createdAt ASC LIMIT ${BOOKING_LIST_LIMIT}
  `, [rusername, prev || Date.now() - UPCOMING_LIST_TIME_BUFFER]);
}
