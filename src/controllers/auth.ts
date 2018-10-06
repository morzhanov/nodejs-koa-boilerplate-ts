import { Context } from "koa";
import { createController } from "awilix-koa";
import AuthService from "../services/auth.service";

const authController = (authService: AuthService) => ({
  login: async (ctx: Context, next: Function) => {
    const {
      body: { email, password }
    } = ctx;

    const token = authService.login(email, password);

    if (!token) {
      ctx.status = 403;
      ctx.message = "Invalid credentials";
      return next();
    }

    ctx.body = token;
  },

  signup: async (ctx: Context, next: Function) => {
    const {
      body: { email, password }
    } = ctx;

    let user = await authService.getUserByEmail(email);

    if (user) {
      ctx.status = 403;
      ctx.message = "User already exists";
      return next();
    }

    ctx.body = await authService.signup(email, password);
  }
});

export default createController(authController)
  .prefix("/")
  .get("/login", "login")
  .put("/signup", "signup");
