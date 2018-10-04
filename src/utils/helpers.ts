import os from "os";

export const printIp = () => {
  const ifaces = os.networkInterfaces();

  Object.keys(ifaces).forEach(ifname => {
    let alias = 0;
    ifaces[ifname].forEach(iface => {
      if (iface.family !== "IPv4" || iface.internal !== false) {
        return;
      }
      if (alias >= 1) {
        console.log(ifname + ":" + alias, iface.address);
      } else {
        console.log(ifname, iface.address);
      }
      ++alias;
    });
  });
};
