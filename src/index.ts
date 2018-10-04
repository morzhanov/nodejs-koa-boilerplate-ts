import * as http from "http";
import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import compress from "koa-compress";
import { PORT, NODE_ENV } from "./constants";
import { scopePerRequest, loadControllers } from "awilix-koa";
import { logger } from "./utils/logger";
import { configureContainer } from "./di/container";
import { notFoundHandler } from "./middleware/not-found";
import { errorHandler } from "./middleware/error-handler";

const app = new Koa();

app
  .use(errorHandler)
  .use(compress())
  .use(cors())
  .use(bodyParser())
  .use(scopePerRequest(configureContainer()))
  .use(loadControllers("../routes/*.js", { cwd: __dirname }))
  .use(notFoundHandler);

const server = http.createServer(app.callback());

server.on("close", () => {
  logger.info("Server closing, bye!");
});

logger.info("Server created, ready to listen", { scope: "startup" });

app.listen(PORT, () =>
  logger.info(`Server listening on ${PORT} in ${NODE_ENV} mode`)
);
