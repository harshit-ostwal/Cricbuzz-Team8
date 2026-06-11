import mongoose from "mongoose";
import env from "../config/env.js";
import logger from "../config/logger.js";

export default async function connectDB() {
  await mongoose.connect(env.MONGO_URL);
  return logger.info("Database Connected");
}
