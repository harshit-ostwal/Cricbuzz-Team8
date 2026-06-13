import ApiError from "../../core/http/api.error.js";
import { getChangedFields } from "../../shared/utils/object.utils.js";
import { UserRepository } from "./user.repository.js";

class UserService {
  #userRepo;
  constructor() {
    this.#userRepo = new UserRepository();
  }

  async getById(id) {
    const user = await this.#userRepo.findById(id);

    if (!user || user.isDeleted) {
      throw ApiError.notFound("User not found, Please try again later.");
    }

    return user;
  }

  async getByEmail(email) {
    const user = await this.#userRepo.findByEmail(email);

    if (!user || user.isDeleted) {
      throw ApiError.notFound("User not found, Please try again later.");
    }

    return user;
  }

  async create(data) {
    const existingUser = await this.#userRepo.findByEmail(data.email);

    if (existingUser && !existingUser.isDeleted) {
      throw ApiError.badRequest(
        "Email already exists, Please try again later."
      );
    }

    const user = await this.#userRepo.create(data);

    if (!user) {
      throw ApiError.internal("Failed to create user, Please try again later.");
    }

    return user;
  }

  async update(id, data) {
    const existingUser = await this.getById(id);

    const hasUpdates = getChangedFields(existingUser, data);
    if (!hasUpdates) {
      throw ApiError.badRequest("No changes detected, Please try again later.");
    }

    const updatedUser = await this.#userRepo.update(id, hasUpdates);

    if (!updatedUser) {
      throw ApiError.internal("Failed to update user, Please try again later.");
    }

    return updatedUser;
  }

  async softDelete(id) {
    const existingUser = await this.getById(id);

    if (existingUser.isDeleted) {
      throw ApiError.badRequest("User not found, Please try again later.");
    }

    const deletedUser = await this.#userRepo.softDelete(id);

    if (!deletedUser) {
      throw ApiError.internal("Failed to delete user, Please try again later.");
    }

    return deletedUser;
  }

  async delete(id) {
    const existingUser = await this.getById(id);

    if (existingUser.isDeleted) {
      throw ApiError.badRequest("User not found, Please try again later.");
    }

    const deletedUser = await this.#userRepo.delete(id);

    if (!deletedUser) {
      throw ApiError.internal("Failed to delete user, Please try again later.");
    }

    return deletedUser;
  }
}

export { UserService };
