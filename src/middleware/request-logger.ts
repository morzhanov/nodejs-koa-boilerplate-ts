import { logger } from "../utils/logger";
import { Context } from "koa";

export const requestLogger = async (ctx: Context, next: Function) => {
  logger.info(`<--  ${ctx.method}  ${ctx.path}`);
  await next();
  logger.info(`-->  ${ctx.status}  ${ctx.path}   message: ${ctx.message}`);
};
