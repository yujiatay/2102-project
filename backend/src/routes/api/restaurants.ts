import * as Router from '@koa/router';

import db from '../../db';
import { requireDiner } from '../../middleware/auth';
import { loadRestaurantFromUsername } from '../../middleware/helpers';
import { HttpStatus } from '../../types/http';
import { Restaurant } from '../../types/restaurant';

const router = new Router();

/**
 * [GET: /restaurants] Get newest restaurants.
 */
router.get('/restaurants', async (ctx) => {
  const restaurants = await db.restaurants.getNewestRestaurants(ctx.query.prev);

  ctx.body = {
    code: HttpStatus.Ok,
    data: restaurants
  };
});

/**
 * [GET: /restaurants/:rusername] Get restaurant details.
 */
router.get('/restaurants/:rusername', loadRestaurantFromUsername, async (ctx) => {
  const restaurant: Restaurant = ctx.state.restaurant;
  const tags = await db.restaurants.getRestaurantTags(restaurant.username);

  ctx.body = {
    code: HttpStatus.Ok,
    data: { restaurant, tags }
  };
});

/**
 * [POST: /restaurants/:rusername/bookmarks] Bookmark a restaurant.
 */
router.post('/restaurants/:rusername/bookmarks', requireDiner, loadRestaurantFromUsername, async (ctx) => {
  const username = ctx.state.user.username;
  const restaurant: Restaurant = ctx.state.restaurant;

  if (await db.diners.isRestaurantBookmarked(username, restaurant.username)) {
    return ctx.body = {
      code: HttpStatus.BadRequest,
      msg: `${restaurant.name} is already bookmarked.`
    };
  }

  await db.diners.addBookmark(username, restaurant.username);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: `You have bookmarked ${restaurant.name}.`
  };
});

/**
 * [DELETE: /restaurants/:rusername/bookmarks] Remove a bookmarked restaurant.
 */
router.delete('/restaurants/:rusername/bookmarks', requireDiner, loadRestaurantFromUsername, async (ctx) => {
  const username = ctx.state.user.username;
  const restaurant: Restaurant = ctx.state.restaurant;

  if (!await db.diners.isRestaurantBookmarked(username, restaurant.username)) {
    return ctx.body = {
      code: HttpStatus.BadRequest,
      msg: `${restaurant.name} is already bookmarked.`
    };
  }

  await db.diners.removeBookmark(username, restaurant.username);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: `You have remove ${restaurant.name} from your bookmarks.`
  };
});

export default router;
