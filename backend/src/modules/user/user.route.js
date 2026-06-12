import createRouter from "../../core/factories/router.factory.js";
import validate from "../../core/middlewares/validate.middleware.js";
import ValidationSource from "../../shared/constants/validation.constants.js";
import { idParamSchema } from "../../shared/schemas/uuid.schema.js";
import userController from "./user.controller.js";
import { emailParamSchema, updateUserSchema } from "./user.schema.js";

const router = createRouter();

router.get(
  "/email/:email",
  validate(emailParamSchema, ValidationSource.PARAMS),
  userController.getByEmail,
);

router.get(
  "/:id",
  validate(idParamSchema, ValidationSource.PARAMS),
  userController.getById,
);

router.patch(
  "/:id",
  validate(idParamSchema, ValidationSource.PARAMS),
  validate(updateUserSchema, ValidationSource.BODY),
  userController.update,
);

router.delete(
  "/:id/soft",
  validate(idParamSchema, ValidationSource.PARAMS),
  userController.softDelete,
);

router.delete(
  "/:id/hard",
  validate(idParamSchema, ValidationSource.PARAMS),
  userController.delete,
);

export default router;
