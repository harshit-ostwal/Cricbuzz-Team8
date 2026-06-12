import mongoose, { Schema } from "mongoose";
import Roles from "../../shared/constants/roles.constants.js";
import generateUUID from "../../shared/utils/uuid.utils.js";

const userSchema = new Schema(
  {
    _id: {
      type: Schema.Types.UUID,
      default: generateUUID,
      immutable: true,
    },
    email: {
      type: String,
      required: "Email is required",
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(Roles),
      default: Roles.USER,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
