import { createContainer, Lifetime, InjectionMode, asValue } from "awilix";
import { logger } from "../utils/logger";

const modulesToLoad = [["services/*.js", Lifetime.SCOPED]];

export function configureContainer() {
  const opts = {
    injectionMode: InjectionMode.CLASSIC
  };
  return createContainer(opts)
    .loadModules(modulesToLoad, {
      cwd: `${__dirname}/..`,
      formatName: "camelCase"
    })
    .register({
      logger: asValue(logger)
    });
}
