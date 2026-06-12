import { Schema } from "mongoose";
import { compareHash, hashValue } from "../../core/security/hash.security.js";
import generateUUID from "../../shared/utils/uuid.utils.js";
import { AuthProvider } from "./account.contants.js";

const accountModel = new Schema(
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
    password: {
      type: String,
      trim: true,
    },
    lastLoginAt: {
      type: Date,
    },
    provider: {
      type: String,
      enum: AuthProvider,
      default: AuthProvider[2],
      required: "Auth provider is required",
    },
    providerId: {
      type: String,
      trim: true,
      required: "Provider ID is required",
    },
  },
  { timestamps: true }
);

accountModel.index(
  {
    providerId: 1,
    provider: 1,
  },
  {
    unique: true,
  }
);

accountModel.index(
  {
    user: 1,
    provider: 1,
  },
  {
    unique: true,
  }
);

accountModel.index({
  user: 1,
});

accountModel.pre("save", async function () {
  if (this.isModified("password") && this.password) {
    this.password = this.password.trim();
  }

  this.password = await hashValue(this.password);
});

accountModel.methods.comparePassword = async function (password) {
  const isPasswordValid = await compareHash(password, this.password);
  return isPasswordValid;
};

const Account =
  mongoose.models.Account || mongoose.model("Account", accountModel);

export default Account;
