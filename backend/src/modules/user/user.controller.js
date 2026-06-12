import ApiResponse from "../../core/http/api.response.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import { UserDto } from "./user.dto.js";
import { UserService } from "./user.service.js";

class UserController {
  #userService;
  constructor() {
    this.#userService = new UserService();
  }

  getById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const user = await this.#userService.getById(id);

    return ApiResponse.ok(
      new UserDto(user),
      "User retrieved successfully"
    ).send(res);
  });

  getByEmail = asyncHandler(async (req, res) => {
    const email = req.params.email;

    const user = await this.#userService.getByEmail(email);

    return ApiResponse.ok(
      new UserDto(user),
      "User retrieved successfully"
    ).send(res);
  });

  create = asyncHandler(async (req, res) => {
    const data = req.body;

    const user = await this.#userService.create(data);

    return ApiResponse.created(
      new UserDto(user),
      "User created successfully"
    ).send(res);
  });

  update = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const user = await this.#userService.update(id, data);

    return ApiResponse.ok(new UserDto(user), "User updated successfully").send(
      res
    );
  });

  softDelete = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const user = await this.#userService.softDelete(id);

    return ApiResponse.ok(
      new UserDto(user),
      "User soft-deleted successfully"
    ).send(res);
  });

  delete = asyncHandler(async (req, res) => {
    const id = req.params.id;

    await this.#userService.delete(id);

    return ApiResponse.noContent("User deleted successfully").send(res);
  });
}

export default new UserController();
