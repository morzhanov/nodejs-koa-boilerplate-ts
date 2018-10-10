import { SECRET } from "../constants";
import jwt from "jsonwebtoken";
import { Context } from "koa";
import { User } from "../entities/user.entity";

export const jwtCheck = async (ctx: Context) => {
  const token = ctx.headers["x-token"];

  if (!token) {
    ctx.status = 403;
    return (ctx.body = {
      success: false,
      error: "No token provided."
    });
  }

  jwt.verify(token as string, SECRET, (err, decoded: User) => {
    if (err) {
      ctx.status = 403;
      return (ctx.body = {
        success: false,
        error: "Failed to authenticate token."
      });
    } else {
      ctx.body.userId = decoded.id;
    }
  });
};
