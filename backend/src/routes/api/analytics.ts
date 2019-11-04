import * as Router from '@koa/router';

import db from '../../db';
import { requireRestaurant } from '../../middleware/auth';
import { HttpStatus } from '../../types/http';

const router = new Router();

/**
 * [GET: /analytics/popularity/date] Get aggregated popularity data for each date.
 * [Params] min, max.
 */
router.get('/analytics/popularity/date', requireRestaurant, async (ctx) => {
  const username = ctx.state.user.username;
  const data = await db.analytics.getDatePopularity(username, ctx.query.min, ctx.query.max);

  ctx.body = {
    code: HttpStatus.Ok,
    data
  };
});

/**
 * [GET: /analytics/popularity/timeslot] Get aggregated popularity data for each time slot.
 * [Params] min, max.
 */
router.get('/analytics/popularity/timeslot', requireRestaurant, async (ctx) => {
  const username = ctx.state.user.username;
  const data = await db.analytics.getTimeslotPopularity(username, ctx.query.min, ctx.query.max);

  ctx.body = {
    code: HttpStatus.Ok,
    data
  };
});

export default router;
