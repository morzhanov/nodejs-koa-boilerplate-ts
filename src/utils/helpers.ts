import CustomError from "../error/custom-error";
import { STATUS_CODES } from "../constants";
import os from "os";
import Bluebird from "bluebird";
import request from "request";
Bluebird.promisifyAll(request);

export const sendRequest = async (params: any) => {
  const { response, body } = await request(params);

  if (response.statusCode === STATUS_CODES.SUCCESS) {
    try {
      return JSON.parse(body as string);
    } catch (e) {
      return body;
    }
  } else {
    return new CustomError("Error when executing request", null);
  }
};

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
