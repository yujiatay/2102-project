
import { AccountType } from '../types/account';
import { HttpStatus } from '../types/http';
import { Middleware } from '../types/misc';

/**
 * Returns an error message if the user is currently logged in.
 */
export const requireLoggedOut: Middleware = async (ctx, next) => {
  if (ctx.state.user) {
    return ctx.body = { code: HttpStatus.BadRequest, msg: 'You are already logged in.' };
  }
  await next();
};

/**
 * Returns an error message if the user is not logged in.
 */
export const requireLogin: Middleware = async (ctx, next) => {
  if (!ctx.state.user) {
    return ctx.body = { code: HttpStatus.BadRequest, msg: 'You need to be logged in to do that.' };
  }
  await next();
};

/**
 * Returns an error message if the user is not logged in as a diner.
 */
export const requireDiner: Middleware = async (ctx, next) => {
  if (!ctx.state.user) {
    return ctx.body = { code: HttpStatus.BadRequest, msg: 'You need to be logged in to do that.' };
  }
  if (ctx.state.user.type !== AccountType.Diner) {
    return ctx.body = { code: HttpStatus.Forbidden, msg: 'You need to be logged in as a diner to do that.' };
  }
  await next();
};

/**
 * Returns an error message if the user is not logged in as a restaurant owner.
 */
export const requireRestaurant: Middleware = async (ctx, next) => {
  if (!ctx.state.user) {
    return ctx.body = { code: HttpStatus.BadRequest, msg: 'You need to be logged in to do that.' };
  }
  if (ctx.state.user.type !== AccountType.Restaurant) {
    return ctx.body = { code: HttpStatus.Forbidden, msg: 'You need to be logged in as a restaurant owner to do that.' };
  }
  await next();
};
