import { Response, Request } from "express";
import { STATUS_CODES } from "../constants";

export default {
  healthCheck: (_: Request, res: Response) =>
    res.status(STATUS_CODES.SUCCESS).json({ success: true, message: "alive" }),
  genericGET: async (_: Request, res: Response) =>
    res.status(STATUS_CODES.SUCCESS).json(),
  genericPOST: async (_: Request, res: Response) =>
    res.status(STATUS_CODES.SUCCESS).json(),
  genericPUT: async (_: Request, res: Response) =>
    res.status(STATUS_CODES.SUCCESS).json(),
  genericDELETE: async (_: Request, res: Response) =>
    res.status(STATUS_CODES.SUCCESS).json()
};
