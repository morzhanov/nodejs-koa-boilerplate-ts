import { createContainer, Lifetime, InjectionMode, asValue } from "awilix";
import { logger } from "../utils/logger";
import { Connection } from "typeorm";

const modulesToLoad = ["services/*.ts", Lifetime.SCOPED];

export const configureContainer = (dbConnection: Connection) => {
  const opts = {
    injectionMode: InjectionMode.CLASSIC
  };
  return createContainer(opts)
    .loadModules(modulesToLoad, {
      cwd: `${__dirname}/..`,
      formatName: "camelCase"
    })
    .register({
      logger: asValue(logger),
      dbConnection: asValue(dbConnection)
    });
};
