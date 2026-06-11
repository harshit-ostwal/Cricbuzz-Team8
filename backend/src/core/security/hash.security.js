import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { SALT_ROUNDS } from "../../shared/constants/security.constants.js";

const hashValue = async (value) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(value, salt);
};

const compareHash = async (value, hash) => {
  return await bcrypt.compare(value, hash);
};

const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export { compareHash, hashToken, hashValue };
