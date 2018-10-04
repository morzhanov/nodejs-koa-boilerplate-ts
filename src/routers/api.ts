const { Router } = require("express");
import Generic from "../controllers/generic";
import User from "../controllers/user";
import JwtCheck from "../middleware/jwt-check";
import ErrorHandler from "../middleware/error-handler";
import NotFound from "../middleware/not-found";

const router = new Router();

router
  .get("/health-check", Generic.healthCheck)
  .get("/generic", Generic.genericGET)
  .post("/generic", Generic.genericPOST)
  .put("/generic", Generic.genericPUT)
  .delete("/generic", Generic.genericDELETE)
  .get("/user", JwtCheck, User.retrieve)
  .put("/user", JwtCheck, User.update)
  .delete("/user", JwtCheck, User.delete)
  .use(NotFound("Not Found"))
  .use(ErrorHandler());

export default router;
