import { IRouterContext } from '@koa/router';
import { ApiResponse } from './http';

export type Middleware = (ctx: IRouterContext, next: () => Promise<ApiResponse>) => Promise<any>;
