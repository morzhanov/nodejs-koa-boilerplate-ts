import { Context } from "koa";
import { createController } from "awilix-koa";
import UserService from "../services/user.service";

const userController = (userService: UserService) => ({
  getUser: async (ctx: Context) => {
    let {
      request: {
        body: { userId }
      }
    } = ctx as any;

    const user = await userService.getUser(userId);

    if (!user) {
      ctx.throw(404, "Data not found");
    }

    user.password = undefined;

    ctx.body = user;
  },

  updateUser: async (ctx: Context) => {
    const {
      request: {
        body: { userData, userId }
      }
    } = ctx as any;

    if (!userData) {
      ctx.throw(403, "Data not provided");
    }

    await userService.updateUser(userId, userData);
  },

  deleteUser: async (ctx: Context) => {
    const {
      request: {
        body: { userId }
      }
    } = ctx as any;

    await userService.deleteUser(userId);
  }
});

export default createController(userController)
  .prefix("/api/user")
  .get("", "getUser")
  .put("", "updateUser")
  .delete("", "deleteUser");
