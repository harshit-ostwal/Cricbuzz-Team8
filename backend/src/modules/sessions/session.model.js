import mongoose, { Schema } from "mongoose";
import generateUUID from "../../shared/utils/uuid.utils.js";

const sessionModel = new Schema(
  {
    _id: {
      type: String,
      default: generateUUID,
      immutable: true,
    },
    user: {
      type: String,
      ref: "User",
      required: "User reference is required",
    },
    refreshToken: {
      type: String,
      trim: true,
      required: "Refresh token is required",
    },
    refreshTokenExpiresAt: {
      type: Date,
      required: "Refresh token expiration date is required",
    },
    tokenVersion: {
      type: Number,
      default: 0,
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

sessionModel.index({
  user: 1,
});

const Session =
  mongoose.models.Session || mongoose.model("Session", sessionModel);

export default Session;
