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

    CLOUDINARY_CLOUD_NAME: zString("CLOUDINARY_CLOUD_NAME", 1, 512),
    CLOUDINARY_API_KEY: zString("CLOUDINARY_API_KEY", 1, 512),
    CLOUDINARY_API_SECRET: zString("CLOUDINARY_API_SECRET", 1, 512),

    GOOGLE_CLIENT_ID: zString("GOOGLE_CLIENT_ID", 1, 512),
    GOOGLE_CLIENT_SECRET: zString("GOOGLE_CLIENT_SECRET", 1, 512),
    GOOGLE_CALLBACK_URL: zUrl("GOOGLE_CALLBACK_URL", 1, 2048),

    GITHUB_CLIENT_ID: zString("GITHUB_CLIENT_ID", 1, 512),
    GITHUB_CLIENT_SECRET: zString("GITHUB_CLIENT_SECRET", 1, 512),
    GITHUB_CALLBACK_URL: zUrl("GITHUB_CALLBACK_URL", 1, 2048),

    MAIL_PROVIDER: zEnum("MAIL_PROVIDER", ["smtp"]),
    SMTP_HOST: zString("SMTP_HOST", 1, 2048),
    SMTP_PORT: zCoerce("SMTP_PORT", "number", {
      min: 1,
      max: 65535,
      int: true,
      positive: true,
    }),
    SMTP_USER: zString("SMTP_USER", 1, 512),
    SMTP_PASSWORD: zString("SMTP_PASSWORD", 1, 512),
    SMTP_SECURE: zCoerce("SMTP_SECURE", "boolean"),

    ACCESS_TOKEN_SECRET: zString("ACCESS_TOKEN_SECRET", 1, 512),
    ACCESS_TOKEN_EXPIRY: zString("ACCESS_TOKEN_EXPIRY", 1, 32),
    REFRESH_TOKEN_SECRET: zString("REFRESH_TOKEN_SECRET", 1, 512),
    REFRESH_TOKEN_EXPIRY: zString("REFRESH_TOKEN_EXPIRY", 1, 32),
    REFRESH_TOKEN_EXPIRY_MS: zCoerce("REFRESH_TOKEN_EXPIRY_MS", "number", {
      min: 1,
      max: Number.MAX_SAFE_INTEGER,
      int: true,
      positive: true,
    }),
  })
  .strip();

export default envSchema;
