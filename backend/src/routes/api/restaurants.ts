import * as Router from '@koa/router';

import db from '../../db';
import { requireDiner, requireRestaurant } from '../../middleware/auth';
import { loadRestaurantFromUsername } from '../../middleware/helpers';
import { HttpStatus } from '../../types/http';
import { Restaurant } from '../../types/restaurant';

const router = new Router();

/**
 * [GET: /restaurants] Get newest restaurants.
 * [Params] name?, cuisineTypes?, tags?, budget?, prev?.
 */
router.get('/restaurants', async (ctx) => {
  const cuisineTypes = ctx.query.cuisineTypes ? JSON.parse(ctx.query.cuisineTypes) : null;
  const tags = ctx.query.tags ? JSON.parse(ctx.query.tags) : null;
  const restaurants = await db.restaurants.getNewestRestaurants(ctx.query.name, cuisineTypes,
    tags, parseFloat(ctx.query.budget || 0), ctx.query.prev);

  ctx.body = {
    code: HttpStatus.Ok,
    data: restaurants
  };
});

/**
 * [GET: /restaurants/recommended] Get the top 5 recommended restaurants for the diner.
 */
router.get('/restaurants/recommended', requireDiner, async (ctx) => {
  const restaurants = await db.restaurants.getRecommendedRestaurants(ctx.state.user.username);

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
 * [GET: /restaurants/:rusername/menuitems] Get all menu items of a restaurant.
 */
router.get('/restaurants/:rusername/menuitems', loadRestaurantFromUsername, async (ctx) => {
  const restaurant: Restaurant = ctx.state.restaurant;
  const menuItems = await db.restaurants.getMenuItems(restaurant.username);

  ctx.body = {
    code: HttpStatus.Ok,
    data: menuItems
  };
});

/**
 * [POST: /restaurants/:rusername/menuitems] Create a new menu item for a restaurant.
 * [Params] name, type, price, description, image.
 */
router.post('/restaurants/:rusername/menuitems', requireRestaurant, loadRestaurantFromUsername, async (ctx) => {
  const body = ctx.request.body;
  const restaurant: Restaurant = ctx.state.restaurant;

  if (ctx.state.user.username !== restaurant.username) {
    return ctx.body = {
      code: HttpStatus.Forbidden,
      msg: 'You do not have permission to do that.'
    };
  }

  const name = body.name.trim();
  const type = body.type.trim();
  const price = parseFloat(body.price);
  const description = body.description.trim();
  const menuItem = await db.restaurants.addMenuItem(restaurant.username, name, type, price, description, body.image);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: `You have added ${menuItem.name}.`,
    data: menuItem
  };
});

/**
 * [DELETE: /restaurants/:rusername/menuitems] Delete a menu item.
 */
router.delete('/restaurants/:rusername/menuitems/:name', requireRestaurant, loadRestaurantFromUsername, async (ctx) => {
  const restaurant: Restaurant = ctx.state.restaurant;

  if (ctx.state.user.username !== restaurant.username) {
    return ctx.body = {
      code: HttpStatus.Forbidden,
      msg: 'You do not have permission to do that.'
    };
  }

  await db.restaurants.deleteMenuItem(restaurant.username, ctx.query.name);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: `You have deleted ${ctx.query.name}.`
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
