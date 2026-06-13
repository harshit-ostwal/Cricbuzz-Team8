import createRouter from "../../core/factories/router.factory.js";
import passport from "passport";
import { authController } from "./auth.controller.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import validate from "../../core/middlewares/validation.middleware.js";
import { loginValidation, registerValidation } from "./auth.validtion.js";
import { authGuard, callbackGuard } from "./guards/auth.gurad.js";

const router = createRouter();
/**
 * @path /api/v1/auth/google
 * @access Public
 * @description loing with google account
 */
router.get("/google", authGuard("google"));

router.get(
  "/google/callback",
  callbackGuard("google"),
  asyncHandler(authController.oauthController.bind(authController)),
);

/**
 * @path /api/v1/auth/github
 * @acess public
 * @description login with gith account
 */

router.get("/github", authGuard("github"));

router.get(
  "/github/callback",
  callbackGuard("github"),
  asyncHandler(authController.oauthControlle),
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

/**
 * @path /api/v1/auth/login
 * @access Public
 * @description login user using email and password
 * @json {"name": "Praful","email": "praful@gmail.com",}
 */

router.post(
  "/login",
  loginValidation,
  validate,
  asyncHandler(authController.login).bind(authController),
);

export default router;
