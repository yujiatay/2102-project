
import * as Router from '@koa/router';

import db from '../../db';
import { HttpStatus } from '../../types/http';

const router = new Router();

/**
 * [GET: /xxx] Get a list of xxx.
 * [Params] prev?, search, filter, sort.
 */
router.get('/xxx', async (ctx) => {
  const body = ctx.query;
  const searchKeywords = body.search ? body.search.split(' ') : [];

  ctx.body = {
    code: HttpStatus.NotImplemented,
    data: 0
  };
});

export default router;
