import * as Router from '@koa/router';

import db from '../../db';
import { requireDiner } from '../../middleware/auth';
import { loadRestaurantFromUsername, loadReviewFromParams } from '../../middleware/helpers';
import { HttpStatus } from '../../types/http';
import { Restaurant } from '../../types/restaurant';
import { Review } from '../../types/review';

const router = new Router();

/**
 * [GET: /restaurants/:rusername/reviews] Get most recent reviews on a restaurant.
 * [Params] prev?.
 */
router.get('/restaurants/:rusername/reviews', loadRestaurantFromUsername, async (ctx) => {
  const restaurant: Restaurant = ctx.state.restaurant;
  const prev = ctx.query.prev ? parseInt(ctx.query.prev, 10) : undefined;
  const reviews = await db.reviews.getRecentReviewsByRestaurant(restaurant.username, prev);

  ctx.body = {
    code: HttpStatus.Ok,
    data: reviews
  };
});

/**
 * [POST: /restaurants/:rusername/reviews] Create a new review on a restaurant.
 * [Params] comment, rating.
 */
router.post('/restaurants/:rusername/reviews', requireDiner, loadRestaurantFromUsername, async (ctx) => {
  const body = ctx.request.body;
  const restaurant: Restaurant = ctx.state.restaurant;
  const username = ctx.state.user.username;
  const comment = body.comment.trim();

  const review = await db.reviews.addReview(restaurant.username, username, comment, body.rating);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: `You have added a review for ${restaurant.name}.`,
    data: review
  };
});

/**
 * [GET: /restaurants/:rusername/reviews/:dusername] Get a review.
 */
router.get('/restaurants/:rusername/reviews/:dusername', loadReviewFromParams, async (ctx) => {
  const review: Review = ctx.state.review;

  ctx.body = {
    code: HttpStatus.Ok,
    data: review
  };
});

/**
 * [PATCH: /restaurants/:rusername/reviews/:dusername] Edit a review.
 * [Params] comment, rating.
 */
router.patch('/restaurants/:rusername/reviews/:dusername', requireDiner, loadReviewFromParams, async (ctx) => {
  const body = ctx.request.body;
  const oldReview: Review = ctx.state.review;

  if (ctx.state.user.username !== oldReview.dusername) {
    return ctx.body = {
      code: HttpStatus.Forbidden,
      msg: 'You do not have permission to do that.'
    };
  }

  const comment = body.comment.trim();
  const review = await db.reviews.updateReview(oldReview, comment, body.rating);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: 'Your review has been updated.',
    data: review
  };
});

/**
 * [DELETE: /restaurants/:rusername/reviews/:dusername] Delete a review.
 */
router.delete('/restaurants/:rusername/reviews/:dusername', requireDiner, loadReviewFromParams, async (ctx) => {
  const review: Review = ctx.state.review;

  if (ctx.state.user.username !== review.dusername) {
    return ctx.body = {
      code: HttpStatus.Forbidden,
      msg: 'You do not have permission to do that.'
    };
  }

  await db.reviews.deleteReview(review);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: 'Your review has been deleted.'
  };
});

export default router;
