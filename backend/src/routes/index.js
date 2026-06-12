import { specs, swaggerUi, theme } from "../config/swagger.config.js";
import createRouter from "../core/factories/router.factory.js";
import ApiResponse from "../core/http/api.response.js";
import { APP_NAME } from "../shared/constants/app.constants.js";
import healthRoute from "./health.route.js";

const router = createRouter();

// Swagger UI for API documentation
router.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, theme));

/**
 * @route GET /
 * @desc  Welcome message for the API
 * @access Public
 */
router.get("/", (_, res) => {
  return ApiResponse.ok(null, `Welcome to the ${APP_NAME} API Service`).send(
    res
  );
});

/**
 * @route GET /health *
 * @desc  Health check endpoint
 * @access Public
 */
router.use("/health", healthRoute);

/**
 * @route GET /users *
 * @desc  User management endpoints
 * @access Public
 */
router.use("/users", (await import("../modules/user/user.route.js")).default);

/**
 * @route GET /profiles *
 * @desc  Profile management endpoints
 * @access Private (requires authentication)
 */
router.use(
  "/profile",
  (await import("../modules/profile/profile.route.js")).default
);

export default router;
