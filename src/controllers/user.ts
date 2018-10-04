import { Response, Request } from "express";
import UserService from "../services/user-service";
import { STATUS_CODES, ERROR_CODES } from "../constants";
import CustomError from "../error/custom-error";
import User from "../models/User";

export default {
  retrieve: async ({ user }: { user: any }, res: Response, next: Function) => {
    try {
      user = await UserService.getUser(user.id);
    } catch (e) {
      return next(e);
    }

    if (!user) {
      return next(
        new CustomError("Data not found", ERROR_CODES.DATA_NOT_FOUND)
      );
    }

    user.password = undefined;

    res.status(STATUS_CODES.SUCCESS).json(user);
  },

  update: async (
    { user, body }: { user: any; body: any },
    res: Response,
    next: Function
  ) => {
    if (!body.userData) {
      return next(
        new CustomError("Data not provided", ERROR_CODES.DATA_NOT_PROVIDED)
      );
    }

    try {
      user = await UserService.editUser(user.id, body.userData);
    } catch (e) {
      return next(e);
    }

    if (!user) {
      return next(
        new CustomError("Data not found", ERROR_CODES.DATA_NOT_FOUND)
      );
    }

    user.password = undefined;

    res.status(STATUS_CODES.SUCCESS).json(user);
  },

  delete: async ({ user }: { user: any }, res: Response, next: Function) => {
    try {
      await UserService.deleteUser(user.id);
    } catch (e) {
      return next(e);
    }

    res.status(STATUS_CODES.SUCCESS).send();
  }
};
