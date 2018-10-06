import os from "os";
import { logger } from "./logger";

export const printIp = () => {
  const ifaces = os.networkInterfaces();
  Object.keys(ifaces).forEach(ifname => {
    let alias = 0;
    ifaces[ifname].forEach(iface => {
      if (iface.family !== "IPv4" || iface.internal !== false) {
        return;
      }
      if (alias >= 1) {
        logger.info(ifname + ":" + alias, iface.address);
      } else {
        logger.info(ifname, iface.address);
      }
      ++alias;
    });
  });
};
