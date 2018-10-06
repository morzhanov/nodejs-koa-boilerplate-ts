import Koa from "koa";
import { logger } from "./utils/logger";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import compress from "koa-compress";
import { scopePerRequest, loadControllers } from "awilix-koa";
import { notFoundHandler } from "./middleware/not-found";
import { errorHandler } from "./middleware/error-handler";

export const createApp = (container: any) => {
  logger.info("Creating app instance");

  const app = new Koa();

  app
    .use(errorHandler)
    .use(compress())
    .use(cors())
    .use(bodyParser())
    .use(scopePerRequest(container))
    .use(loadControllers("./controllers/*.js", { cwd: __dirname }))
    .use(notFoundHandler);

  logger.info("Koa application created!");

  return app;
};
