
import * as Router from '@koa/router';

import db from '../../db';
import { requireDiner, requireRestaurant } from '../../middleware/auth';
import { loadBookingFromParams, loadDinerFromUsername, loadRestaurantFromUsername } from '../../middleware/helpers';
import { Booking } from '../../types/booking';
import { Diner } from '../../types/diner';
import { HttpStatus } from '../../types/http';
import { Restaurant } from '../../types/restaurant';

const router = new Router();

/**
 * [GET: /restaurants/:rusername/slots] Get all available slots of a restaurant.
 */
router.get('/restaurants/:rusername/slots', loadRestaurantFromUsername, async (ctx) => {
  const restaurant: Restaurant = ctx.state.restaurant;

  const slots = await db.bookings.getRestaurantSlots(restaurant.username);

  ctx.body = {
    code: HttpStatus.Ok,
    data: slots
  };
});

/**
 * [POST: /restaurants/:rusername/slots] Create a new available slot for a restaurant (self only).
 */
router.post('/restaurants/:rusername/slots', requireRestaurant, loadRestaurantFromUsername, async (ctx) => {
  const body = ctx.request.body;
  const restaurant: Restaurant = ctx.state.restaurant;

  if (ctx.state.user.username !== restaurant.username) {
    return ctx.body = {
      code: HttpStatus.Forbidden,
      msg: 'You do not have permission to do that.'
    };
  }

  const slot = await db.bookings.addAvailableSlot(restaurant.username, body.dayOfWeek, body.startTime, body.endTime);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: 'You have added a new available slot.',
    data: slot
  };
});

/**
 * [DELETE: /restaurants/:rusername/slots/:data] Delete an available slot (self only).
 * [Note] Format of 'data': dayOfWeek,startTime,endTime
 */
router.delete('/restaurants/:rusername/slots/:data', requireRestaurant, loadRestaurantFromUsername, async (ctx) => {
  const restaurant: Restaurant = ctx.state.restaurant;

  if (ctx.state.user.username !== restaurant.username) {
    return ctx.body = {
      code: HttpStatus.Forbidden,
      msg: 'You do not have permission to do that.'
    };
  }

  const data = ctx.params.data.split(',');
  const dayOfWeek = parseInt(data[0], 10);
  const startTime = data[1];
  const endTime = data[2];
  await db.bookings.deleteAvailableSlot(restaurant.username, dayOfWeek, startTime, endTime);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: 'You have deleted an available slot.'
  };
});

/**
 * [GET: /restaurants/:rusername/bookings] Get upcoming bookings on a restaurant (self only).
 * [Params] prev?.
 */
router.get('/restaurants/:rusername/bookings', requireRestaurant, loadRestaurantFromUsername, async (ctx) => {
  const restaurant: Restaurant = ctx.state.restaurant;

  if (ctx.state.user.username !== restaurant.username) {
    return ctx.body = {
      code: HttpStatus.Forbidden,
      msg: 'You do not have permission to do that.'
    };
  }

  const prev = ctx.query.prev ? parseInt(ctx.query.prev, 10) : undefined;
  const bookings = await db.bookings.getUpcomingBookingsOnRestaurant(restaurant.username, prev);

  ctx.body = {
    code: HttpStatus.Ok,
    data: bookings
  };
});

/**
 * [GET: /diners/:dusername/bookings] Get upcoming bookings made by a diner (self only).
 * [Params] prev?.
 */
router.get('/diners/:dusername/bookings', requireDiner, loadDinerFromUsername, async (ctx) => {
  const diner: Diner = ctx.state.diner;

  if (ctx.state.user.username !== diner.username) {
    return ctx.body = {
      code: HttpStatus.Forbidden,
      msg: 'You do not have permission to do that.'
    };
  }

  const prev = ctx.query.prev ? parseInt(ctx.query.prev, 10) : undefined;
  const bookings = await db.bookings.getUpcomingBookingsByDiner(diner.username, prev);

  ctx.body = {
    code: HttpStatus.Ok,
    data: bookings
  };
});

/**
 * [GET: /restaurants/:rusername/bookings/history] Get past bookings on a restaurant (self only).
 * [Params] prev?.
 */
router.get('/restaurants/:rusername/bookings/history', requireRestaurant, loadRestaurantFromUsername, async (ctx) => {
  const restaurant: Restaurant = ctx.state.restaurant;

  if (ctx.state.user.username !== restaurant.username) {
    return ctx.body = {
      code: HttpStatus.Forbidden,
      msg: 'You do not have permission to do that.'
    };
  }

  const prev = ctx.query.prev ? parseInt(ctx.query.prev, 10) : undefined;
  const bookings = await db.bookings.getPastBookingsOnRestaurant(restaurant.username, prev);

  ctx.body = {
    code: HttpStatus.Ok,
    data: bookings
  };
});

/**
 * [GET: /diners/:dusername/bookings/history] Get past bookings made by a diner (self only).
 * [Params] prev?.
 */
router.get('/diners/:dusername/bookings/history', requireDiner, loadDinerFromUsername, async (ctx) => {
  const diner: Diner = ctx.state.diner;

  if (ctx.state.user.username !== diner.username) {
    return ctx.body = {
      code: HttpStatus.Forbidden,
      msg: 'You do not have permission to do that.'
    };
  }

  const prev = ctx.query.prev ? parseInt(ctx.query.prev, 10) : undefined;
  const bookings = await db.bookings.getPastBookingsByDiner(diner.username, prev);

  ctx.body = {
    code: HttpStatus.Ok,
    data: bookings
  };
});

/**
 * [POST: /restaurants/:rusername/bookings] Create a new booking on a restaurant.
 * [Params] dayOfWeek, startTime, endTime, date, pax, message.
 */
router.post('/restaurants/:rusername/bookings', requireDiner, loadRestaurantFromUsername, async (ctx) => {
  const body = ctx.request.body;
  const restaurant: Restaurant = ctx.state.restaurant;

  const booking = await db.bookings.addBooking(ctx.state.user.username, restaurant.username, body.dayOfWeek,
    body.startTime, body.endTime, body.date, body.pax, body.message);

  ctx.body = {
    code: HttpStatus.Ok,
    data: booking
  };
});

/**
 * [DELETE: /restaurants/:rusername/bookings/:data] Delete a booking (creator only).
 * [Note] Format of 'data': dusername,dayOfWeek,startTime,endTime,date
 */
router.delete('/restaurants/:rusername/bookings', requireDiner, loadBookingFromParams, async (ctx) => {
  const booking: Booking = ctx.state.booking;

  if (ctx.state.user.username !== booking.dusername) {
    return ctx.body = {
      code: HttpStatus.Forbidden,
      msg: 'You do not have permission to do that.'
    };
  }

  await db.bookings.deleteBooking(booking);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: 'Your booking has been cancelled.'
  };
});

/**
 * [POST: /restaurants/:rusername/bookings/:data/confirm] Confirm a booking (restaurant only).
 * [Note] Format of 'data': dusername,dayOfWeek,startTime,endTime,date
 */
router.post('/restaurants/:rusername/bookings/:data/confirm', requireRestaurant, loadBookingFromParams, async (ctx) => {
  const booking: Booking = ctx.state.booking;

  if (ctx.state.user.username !== booking.rusername) {
    return ctx.body = {
      code: HttpStatus.Forbidden,
      msg: 'You do not have permission to do that.'
    };
  }

  await db.bookings.confirmBooking(booking);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: 'You have marked the booking as confirmed.'
  };
});

export default router;
