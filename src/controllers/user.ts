import { Context } from "koa";
import { createController } from "awilix-koa";
import UserService from "../services/user.service";

const userController = (userService: UserService) => ({
  getUser: async (ctx: Context, next: Function) => {
    let {
      body: { userId }
    } = ctx;

    const user = await userService.getUser(userId);

    if (!user) {
      ctx.status = 404;
      ctx.message = "Data not found";
      return next();
    }

    user.password = undefined;

    ctx.body = user;
  },

  updateUser: async (ctx: Context, next: Function) => {
    const {
      body: { userData, userId }
    } = ctx;

    if (!userData) {
      ctx.status = 403;
      ctx.message = "Data not provided";
      return next();
    }

    await userService.updateUser(userId, userData);
  },

  deleteUser: async (ctx: Context) => {
    const {
      body: { userId }
    } = ctx;

    await userService.deleteUser(userId);
  }
});

export default createController(userController)
  .prefix("/user")
  .get("", "getUser")
  .put("", "updateUser")
  .delete("", "deleteUser");
