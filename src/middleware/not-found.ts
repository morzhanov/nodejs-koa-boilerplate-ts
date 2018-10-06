import { Context } from "koa";

export const notFoundHandler = async (ctx: Context) => {
  const msg = `${ctx.request.method} ${ctx.request.path}`;
  ctx.status = 404;
  ctx.message = `Not found: ${msg}`;
};
