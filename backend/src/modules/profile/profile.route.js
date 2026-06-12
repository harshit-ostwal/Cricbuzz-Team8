import createRouter from "../../core/factories/router.factory.js";
import validate from "../../core/middlewares/validate.middleware.js";
import { upload } from "../../infrastructure/storage/multer/multer.middleware.js";
import ValidationSource from "../../shared/constants/validation.constants.js";
import { userIdParamSchema } from "../../shared/schemas/uuid.schema.js";
import profileController from "./profile.controller.js";
import { createProfileSchema, updateProfileSchema } from "./profile.schema.js";

const router = createRouter();

/**
 * @route GET / *
 * @desc  Profile management endpoints
 * @access Private (requires authentication)
 */
router.get(
  "/",
  validate(userIdParamSchema, ValidationSource.USER),
  profileController.getProfileByUserId,
);

/**
 * @route POST / *
 * @desc  Profile management endpoints
 * @access Private (requires authentication)
 */
router.post(
  "/",
  upload.single("avatar"),
  validate(userIdParamSchema, ValidationSource.USER),
  validate(createProfileSchema),
  profileController.createProfile,
);

/**
 * @route PATCH / *
 * @desc  Profile management endpoints
 * @access Private (requires authentication)
 */
router.patch(
  "/",
  upload.single("avatar"),
  validate(userIdParamSchema, ValidationSource.USER),
  validate(updateProfileSchema),
  profileController.updateProfile,
);

export default router;
