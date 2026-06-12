import z from "zod/v4";
import { zString, zUrl } from "../../shared/utils/zod.utils.js";

const profileSchema = z
  .strictObject({
    fullName: z.strictObject({
      firstName: zString("First Name"),
      lastName: zString("Last Name"),
    }),
    avatar: zUrl("Avatar").optional(),
  })
  .strip();

const createProfileSchema = profileSchema;
const updateProfileSchema = profileSchema
  .extend({
    fullName: z
      .strictObject({
        firstName: zString("First Name").optional(),
        lastName: zString("Last Name").optional(),
      })
      .partial(),
  })
  .partial();

export { createProfileSchema, updateProfileSchema };
