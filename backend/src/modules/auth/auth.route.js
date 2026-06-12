import createRouter from "../../core/factories/router.factory.js";
import passport from 'passport'
import {authController} from "./auth.controller.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
const router = createRouter();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    prompt : "select_account"
  }),
);


router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: false,
  }),
  // change wrap with bind
  asyncHandler(authController.googleCallback.bind(authController))
);


export default router