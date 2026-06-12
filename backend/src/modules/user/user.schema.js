import z from "zod/v4";
import Roles from "../../shared/constants/roles.constants.js";
import { zCoerce, zEmail, zEnum } from "../../shared/utils/zod.utils.js";

const emailParamSchema = z.strictObject({
  email: zEmail(),
});

const userSchema = z
  .strictObject({
    email: zEmail(),
    role: zEnum("Role", Object.values(Roles)).optional(),
    isVerified: zCoerce("Is Verified", "boolean").optional(),
  })
  .strip();

const createUserSchema = userSchema;
const updateUserSchema = userSchema.partial();

export { createUserSchema, emailParamSchema, updateUserSchema };
