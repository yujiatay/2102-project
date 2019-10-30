import * as Router from '@koa/router';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RouterContext } from 'koa-router';

import { JWT_COOKIE_NAME, SAMPLE_BCRYPT_HASH } from '../../constants';
import db from '../../db';
import { requireLoggedOut, requireLogin, requireRestaurant } from '../../middleware/auth';
import { AccountType, TokenData } from '../../types/account';
import { DinerPrivate } from '../../types/diner';
import { HttpStatus } from '../../types/http';
import { RestaurantPrivate } from '../../types/restaurant';

const COOKIE_EXPIRATION = 30 * 24 * 60 * 60 * 1000; // 30 days

const router = new Router();

async function setLoggedIn(ctx: RouterContext, type: AccountType, entity: RestaurantPrivate | DinerPrivate) {
  const token = await jwt.sign({ type, email: entity.email, username: entity.username },
    process.env.JWT_SECRET!, { algorithm: 'HS256', expiresIn: '30d' });
  ctx.cookies.set(JWT_COOKIE_NAME, token, { maxAge: COOKIE_EXPIRATION });
}

/**
 * [POST: /restaurants] Create a new account (restaurant).
 * [Params] username, password, email, name, cuisineType, branchLocation, openingHours, capacity, tags.
 */
router.post('/restaurants', requireLoggedOut, async (ctx) => {
  const body = ctx.request.body;
  const email = body.email.trim().toLowerCase();
  const username = body.username.trim().toLowerCase();

  if (!await db.accounts.isEmailAvailable(email)) {
    return ctx.body = {
      code: HttpStatus.BadRequest,
      msg: 'Email is already used by another account.'
    };
  }

  if (!await db.accounts.isUsernameAvailable(username)) {
    return ctx.body = {
      code: HttpStatus.BadRequest,
      msg: 'Username is already used by another account.'
    };
  }

  const restaurant = await db.restaurants.addRestaurant(username, body.password, email,
    body.name, body.cuisineType, body.branchLocation, body.openingHours, body.capacity);

  if (!restaurant) {
    return ctx.body = {
      code: HttpStatus.BadRequest,
      msg: 'Account could not be created.'
    };
  }

  const tags = await db.restaurants.setRestaurantTags(restaurant.username, body.tags);

  await setLoggedIn(ctx, AccountType.Restaurant, restaurant);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: 'Your account has been created.',
    data: { restaurant, tags }
  };
});

/**
 * [PATCH: /restaurants] Edit restaurant details.
 * [Params] name, cuisineType, branchLocation, openingHours, capacity, tags.
 */
router.patch('/restaurants/:rusername', requireRestaurant, async (ctx) => {
  const body = ctx.request.body;

  if (ctx.params.username !== ctx.state.user.username) {
    return ctx.body = {
      code: HttpStatus.Forbidden,
      msg: 'You do not have permission to do that.'
    };
  }

  const username = ctx.state.user.username;

  const restaurant = await db.restaurants.updateRestaurant(username, body.name, body.cuisineType,
    body.branchLocation, body.openingHours, body.capacity);
  const tags = await db.restaurants.setRestaurantTags(username, body.tags);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: 'Restaurant details have been updated.',
    data: { restaurant, tags }
  };
});

/**
 * [POST: /diners] Create a new account (diner).
 * [Params] username, password, email, referralCode.
 */
router.post('/diners', requireLoggedOut, async (ctx) => {
  const body = ctx.request.body;
  const email = body.email.trim().toLowerCase();
  const username = body.username.trim().toLowerCase();

  if (!await db.accounts.isEmailAvailable(email)) {
    return ctx.body = {
      code: HttpStatus.BadRequest,
      msg: 'Email is already used by another account.'
    };
  }

  if (!await db.accounts.isUsernameAvailable(username)) {
    return ctx.body = {
      code: HttpStatus.BadRequest,
      msg: 'Username is already used by another account.'
    };
  }

  const diner = await db.diners.addDiner(username, body.password, email, body.referralCode);

  if (!diner) {
    return ctx.body = {
      code: HttpStatus.BadRequest,
      msg: 'Account could not be created.'
    };
  }

  await setLoggedIn(ctx, AccountType.Diner, diner);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: 'Your account has been created.',
    data: diner
  };
});

/**
 * [GET: /session] Get session details.
 */
router.get('/session', requireLogin, async (ctx) => {
  const data: TokenData = ctx.state.user;

  let entity: RestaurantPrivate | DinerPrivate | null;
  if (data.type === AccountType.Restaurant) {
    entity = await db.restaurants.getRestaurantWithPrivateData(data.username);
  } else {
    entity = await db.diners.getDinerWithPrivateData(data.username);
  }

  ctx.body = {
    code: HttpStatus.Ok,
    data: { type: data.type, entity }
  };
});

/**
 * [POST: /session] Login.
 * [Params] username, password.
 */
router.post('/session', requireLoggedOut, async (ctx) => {
  const body = ctx.request.body;

  const restaurant = await db.restaurants.getRestaurantWithPassword(body.username);
  const diner = await db.diners.getDinerWithPassword(body.username);
  const entity = restaurant || diner;

  if (!entity) {
    await bcrypt.compare('xxxxxxx', SAMPLE_BCRYPT_HASH); // just to occupy time
    return ctx.body = {
      code: HttpStatus.BadRequest,
      msg: 'Incorrect username or password.'
    };
  }

  if (!await bcrypt.compare(body.password, entity.password)) {
    return ctx.body = {
      code: HttpStatus.BadRequest,
      msg: 'Incorrect username or password.'
    };
  }

  const type = restaurant ? AccountType.Restaurant : AccountType.Diner;
  await setLoggedIn(ctx, type, entity);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: 'You are now logged in.',
    data: { type, entity: { ...entity, password: undefined } }
  };
});

/**
 * [DELETE: /session] Logout.
 */
router.delete('/session', requireLogin, async (ctx) => {
  ctx.cookies.set(JWT_COOKIE_NAME);

  ctx.body = {
    code: HttpStatus.Ok,
    data: 'You are now logged out.'
  };
});

export default router;
