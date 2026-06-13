import { Schema, model } from "mongoose";
import { PROVIDER, ROLES } from "../shared/constants/user.constants.js";
const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String },
    role: { type: String, enum: Object.values(ROLES), default: ROLES.SCORER },
    isDeleted: { type: Boolean, default: false },
    profileImage: {
      type: String,
      default:
        "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
    },
    provider: {
      type: String,
      enum: Object.values(PROVIDER),
      default: "LOCAL",
    },

    providerId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const userModel = model("users", userSchema);

export default userModel;
