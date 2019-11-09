import db from '../db';
import { HttpStatus } from '../types/http';
import { Middleware } from '../types/misc';

/**
 * Loads the restaurant identified by the rusername on `ctx.params`.
 * Returns an error message if there is no such restaurant, otherwise,
 * the loaded Restaurant object is attached to `ctx.state`.
 */
export const loadRestaurantFromUsername: Middleware = async (ctx, next) => {
  const restaurant = await db.restaurants.getRestaurantByUsername(ctx.params.rusername);

  if (!restaurant) {
    return ctx.body = {
      code: HttpStatus.NotFound,
      msg: 'Unable to find or access the requested content.'
    };
  }

  ctx.state.restaurant = restaurant;
  await next();
};

/**
 * Loads the diner identified by the dusername on `ctx.params`.
 * Returns an error message if there is no such diner, otherwise,
 * the loaded Diner object is attached to `ctx.state`.
 */
export const loadDinerFromUsername: Middleware = async (ctx, next) => {
  const diner = await db.diners.getDinerByUsername(ctx.params.dusername);

  if (!diner) {
    return ctx.body = {
      code: HttpStatus.NotFound,
      msg: 'Unable to find or access the requested content.'
    };
  }

  ctx.state.diner = diner;
  await next();
};

/**
 * Loads the article identified by the ausername and acreated on `ctx.params`.
 * Returns an error message if there is no such article, otherwise,
 * the loaded Article object is attached to `ctx.state`.
 */
export const loadArticleFromParams: Middleware = async (ctx, next) => {
  const article = await db.articles.getArticle(ctx.params.ausername, parseInt(ctx.params.acreated, 10));

  if (!article) {
    return ctx.body = {
      code: HttpStatus.NotFound,
      msg: 'Unable to find or access the requested content.'
    };
  }

  ctx.state.article = article;
  await next();
};

/**
 * Loads the booking identified by the rusername and data on `ctx.params`.
 * Returns an error message if there is no such booking, otherwise,
 * the loaded Booking object is attached to `ctx.state`.
 */
export const loadBookingFromParams: Middleware = async (ctx, next) => {
  const data = ctx.request.query;
  const dusername = data['dusername'];
  const dayOfWeek = parseInt(data['dayOfWeek'], 10);
  const startTime = data['startTime'];
  const endTime = data['endTime'];
  const date = parseInt(data['date'], 10);

  const booking = await db.bookings.getBooking(dusername, ctx.params.rusername, dayOfWeek, startTime, endTime, date);
  if (!booking) {
    return ctx.body = {
      code: HttpStatus.NotFound,
      msg: 'Unable to find or access the requested content.'
    };
  }

  ctx.state.booking = booking;
  await next();
};

/**
 * Loads the booking identified by the rusername and data on `ctx.body`.
 * Returns an error message if there is no such booking, otherwise,
 * the loaded Booking object is attached to `ctx.state`.
 */
export const loadBookingFromBody: Middleware = async (ctx, next) => {
  const data = ctx.request.body;
  const dusername = data['dusername'];
  const dayOfWeek = parseInt(data['dayOfWeek'], 10);
  const startTime = data['startTime'];
  const endTime = data['endTime'];
  const date = parseInt(data['date'], 10);

  const booking = await db.bookings.getBooking(dusername, ctx.params.rusername, dayOfWeek, startTime, endTime, date);
  if (!booking) {
    return ctx.body = {
      code: HttpStatus.NotFound,
      msg: 'Unable to find or access the requested content.'
    };
  }

  ctx.state.booking = booking;
  await next();
};

/**
 * Loads the comment identified by the ausername, acreated, username, and created on `ctx.params`.
 * Returns an error message if there is no such comment, otherwise,
 * the loaded Comment object is attached to `ctx.state`.
 */
export const loadCommentFromParams: Middleware = async (ctx, next) => {
  const comment = await db.articles.getComment(ctx.params.ausername, parseInt(ctx.params.acreated, 10),
    ctx.params.username, parseInt(ctx.params.createdAt, 10));

  if (!comment) {
    return ctx.body = {
      code: HttpStatus.NotFound,
      msg: 'Unable to find or access the requested content.'
    };
  }

  ctx.state.comment = comment;
  await next();
};

/**
 * Loads the review identified by the rusername and dusername on `ctx.params`.
 * Returns an error message if there is no such review, otherwise,
 * the loaded Review object is attached to `ctx.state`.
 */
export const loadReviewFromParams: Middleware = async (ctx, next) => {
  const review = await db.reviews.getReview(ctx.params.rusername, ctx.params.dusername);

  if (!review) {
    return ctx.body = {
      code: HttpStatus.NotFound,
      msg: 'Unable to find or access the requested content.'
    };
  }

  ctx.state.review = review;
  await next();
};
