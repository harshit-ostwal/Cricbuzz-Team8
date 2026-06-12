import createRouter from "../../core/factories/router.factory.js";
import validate from "../../core/middlewares/validate.middleware.js";
import { upload } from "../../infrastructure/storage/multer/multer.middleware.js";
import profileController from "./profile.controller.js";
import { createProfileSchema, updateProfileSchema } from "./profile.schema.js";

const router = createRouter();

/**
 * @route GET / *
 * @desc  Profile management endpoints
 * @access Private (requires authentication)
 */
router.get("/", profileController.getProfileByUserId);

/**
 * @route POST / *
 * @desc  Profile management endpoints
 * @access Private (requires authentication)
 */
router.post(
  "/",
  upload.single("avatar"),
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
  validate(updateProfileSchema),
  profileController.updateProfile,
);

export default router;
