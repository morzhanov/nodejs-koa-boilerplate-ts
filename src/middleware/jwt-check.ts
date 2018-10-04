import { Response } from "express";
import { STATUS_CODES, SECRET } from "../constants";
import jwt from "jsonwebtoken";

export default (req: any, res: Response, next: Function) => {
  const token = req.headers["x-token"];

  if (token) {
    jwt.verify(token as string, SECRET, (err, decoded) => {
      if (err) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({
          success: false,
          error: "Failed to authenticate token."
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      success: false,
      error: "No token provided."
    });
  }
};
