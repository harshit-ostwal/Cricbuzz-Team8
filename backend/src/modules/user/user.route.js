import createRouter from "../../core/factories/router.factory.js";
import validate from "../../core/middlewares/validate.middleware.js";
import ValidationSource from "../../shared/constants/validation.constants.js";
import { idParamSchema } from "../../shared/schemas/uuid.schema.js";
import userController from "./user.controller.js";
import { emailParamSchema, updateUserSchema } from "./user.schema.js";

const router = createRouter();

/**
 * @route GET /email/:email *
 * @desc  User management endpoints
 * @access Public
 */
router.get(
  "/email/:email",
  validate(emailParamSchema, ValidationSource.PARAMS),
  userController.getByEmail
);

/**
 * @route GET /:id *
 * @desc  User management endpoints
 * @access Private (requires authentication)
 */
router.get(
  "/:id",
  validate(idParamSchema, ValidationSource.PARAMS),
  userController.getById
);

/**
 * @route PATCH /:id *
 * @desc  User management endpoints
 * @access Private (requires authentication)
 */
router.patch(
  "/:id",
  validate(idParamSchema, ValidationSource.PARAMS),
  validate(updateUserSchema, ValidationSource.BODY),
  userController.update
);

/**
 * @route DELETE /:id/soft *
 * @desc  User management endpoints
 * @access Private (requires authentication)
 */
router.delete(
  "/:id/soft",
  validate(idParamSchema, ValidationSource.PARAMS),
  userController.softDelete
);

/**
 * @route DELETE /:id/hard *
 * @desc  User management endpoints
 * @access Private (requires authentication)
 */
router.delete(
  "/:id/hard",
  validate(idParamSchema, ValidationSource.PARAMS),
  userController.delete
);

export default router;
