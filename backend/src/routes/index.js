import { specs, swaggerUi, theme } from "../config/swagger.config.js";
import createRouter from "../core/factories/router.factory.js";
import ApiResponse from "../core/http/api.response.js";
import { APP_NAME } from "../shared/constants/app.constants.js";
import healthRoute from "./health.route.js";
import authRoute from "../modules/auth/auth.route.js";
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

router.use('/auth', authRoute)

export default router;
