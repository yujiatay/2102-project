
import * as Router from '@koa/router';
import * as send from 'koa-send';

import api from './api';

const router = new Router();
router.use(api.routes());

// Catch-all handler: use index.html.
router.get('*', async (ctx) => {
  await send(ctx, 'www/index.html');
});

export default router;
