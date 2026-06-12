import mongoose from "mongoose";
import { DATABASE_URL } from "../../config/env.config.js";
import ApiError from "../../core/http/api.error.js";
import loggerService from "../logger/logger.service.js";

class DatabaseService {
  async connect() {
    try {
      loggerService.info("Connecting to the database...");
      await mongoose.connect(DATABASE_URL);
      loggerService.info("Successfully connected to the database.");
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      loggerService.error("Database connection failed.", error);
      throw ApiError.badGateway("Failed to connect to the database.", [error]);
    }
  }

  async disconnect() {
    try {
      loggerService.info("Disconnecting from the database...");
      await mongoose.disconnect();
      loggerService.info("Successfully disconnected from the database.");
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      loggerService.error("Database disconnection failed.", error);
      throw ApiError.badGateway("Failed to disconnect from the database.", [
        error,
      ]);
    }
  }

  async healthCheck() {
    try {
      loggerService.info("Performing database health check...");
      await mongoose.connection.db.admin().ping();
      loggerService.info("Database health check successful.");
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      loggerService.error("Database health check failed.", error);
      throw ApiError.serviceUnavailable("Database health check failed.", [
        error,
      ]);
    }
  }

  async transaction(callback) {
    const session = await mongoose.startSession();

    try {
      return await session.withTransaction(() => {
        callback(session);
      });
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      loggerService.error("Database transaction failed.", error);
      throw ApiError.internalServerError("Database transaction failed.", [
        error,
      ]);
    } finally {
      await session.endSession();
    }
  }
}

export default new DatabaseService();
