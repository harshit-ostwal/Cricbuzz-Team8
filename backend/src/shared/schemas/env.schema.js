import { z } from "zod/v4";
import { zCoerce, zEnum, zString, zUrl } from "../../shared/utils/zod.utils.js";

const envSchema = z
  .strictObject({
    NODE_ENV: zEnum("NODE_ENV", [
      "development",
      "production",
      "testing",
    ]).default("development"),
    DOTENV_DEBUG: zCoerce("DOTENV_DEBUG", "boolean").default(false),
    LOG_LEVEL: zEnum("LOG_LEVEL", [
      "fatal",
      "error",
      "warn",
      "info",
      "debug",
      "trace",
    ]).default("info"),
    PORT: zCoerce("PORT", "number", {
      min: 1,
      max: 65535,
      int: true,
      positive: true,
    }).default(8080),
    ALLOWED_ORIGINS: zString("ALLOWED_ORIGINS", 1, 2048),

    BACKEND_URL: zUrl("BACKEND_URL", 1, 2048),
    FRONTEND_URL: zUrl("FRONTEND_URL", 1, 2048),

    DATABASE_URL: zString("DATABASE_URL", 1, 2048),

    CLOUDINARY_CLOUD_NAME: zString("CLOUDINARY_CLOUD_NAME", 1, 255),
    CLOUDINARY_API_KEY: zString("CLOUDINARY_API_KEY", 1, 255),
    CLOUDINARY_API_SECRET: zString("CLOUDINARY_API_SECRET", 1, 255),

    COOKIE_SECRET_KEY: zString("COOKIE_SECRET_KEY", 32, 255),

    ACCESS_TOKEN_SECRET: zString("ACCESS_TOKEN_SECRET", 32, 255),
    REFRESH_TOKEN_SECRET: zString("REFRESH_TOKEN_SECRET", 32, 255),
    ACCESS_TOKEN_EXPIRY: zString("ACCESS_TOKEN_EXPIRY", 1, 50),
    REFRESH_TOKEN_EXPIRY: zString("REFRESH_TOKEN_EXPIRY", 1, 50),
    REFRESH_TOKEN_EXPIRY_MS: zString("REFRESH_TOKEN_EXPIRY_MS", 1, 50),

    GOOGLE_CLIENT_ID: zString("GOOGLE_CLIENT_ID", 1, 255),
    GOOGLE_CLIENT_SECRET: zString("GOOGLE_CLIENT_SECRET", 1, 255),
    GOOGLE_CALLBACK_URL: zString("GOOGLE_CALLBACK_UR", 1, 255),
  })
  .strip();

export default envSchema;
