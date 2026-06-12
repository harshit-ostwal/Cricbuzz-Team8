import createRouter from "../../core/factories/router.factory.js";
import validate from "../../core/middlewares/validate.middleware.js";
import { upload } from "../../infrastructure/storage/multer/multer.middleware.js";
import profileController from "./profile.controller.js";
import { createProfileSchema, updateProfileSchema } from "./profile.schema.js";

const router = createRouter();

router.get("/", profileController.getProfileByUserId);

router.post(
  "/",
  upload.single("avatar"),
  validate(createProfileSchema),
  profileController.createProfile,
);

router.patch(
  "/",
  upload.single("avatar"),
  validate(updateProfileSchema),
  profileController.updateProfile,
);

export default router;
