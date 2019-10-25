// Load environment variables from .env.
import * as dotenv from 'dotenv';
dotenv.config();

import * as Koa from 'koa';
import * as helmet from 'koa-helmet';
import * as jwt from 'koa-jwt';
import * as serveStatic from 'koa-static';
import { JWT_COOKIE_NAME } from './constants';

import router from './routes';

const app = new Koa();

// Add additional security headers.
app.use(helmet({
  frameguard: {
    action: 'deny'
  },
  hidePoweredBy: true
}));

// Serve static files from www.
app.use(serveStatic('www', {
  maxage: 1000 * 60 * 60 * 24 * 7 // 1 week
}));

// Add JWT middleware.
// ctx.state.user will be set if the token is valid.
app.use(jwt({ secret: process.env.JWT_SECRET!, cookie: JWT_COOKIE_NAME, passthrough: true }));

// Add application routes.
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
