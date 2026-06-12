import createRouter from "../../core/factories/router.factory.js";
import passport from "passport";
import { authController } from "./auth.controller.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import validate from "../../core/middlewares/validation.middleware.js";
import registerValidation from "./auth.validtion.js";

const router = createRouter();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    prompt: "select_account",
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: false,
  }),
  // change wrap with bind
  asyncHandler(authController.googleCallback.bind(authController)),
);

/**
 *  @path /api/v1/auth/register
 *  @access Public
 *  @description Create new user
 *  @josn {"name": "Praful","email": "praful@gmail.com","password": "12345678","role": "SCORER"}
 */
router.post(
  "/register",
  registerValidation,
  validate,
  asyncHandler(authController.register.bind(authController)),
);

export default router;
