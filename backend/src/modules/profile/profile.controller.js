import ApiResponse from "../../core/http/api.response.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import { ProfileService } from "./profile.service.js";

class ProfileController {
  #profileService;
  constructor() {
    this.#profileService = new ProfileService();
  }

  getProfileByUserId = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const profile = await this.#profileService.getProfileByUserId(userId);

    return ApiResponse.ok(res, "Profile fetched successfully", profile);
  });

  createProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const data = req.body;
    const avatarLocalFile = req.file?.path || null;

    const profile = await this.#profileService.create(
      userId,
      data,
      avatarLocalFile,
    );

    return ApiResponse.created(res, "Profile created successfully", profile);
  });

  updateProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const data = req.body;
    const avatarLocalFile = req.file?.path || null;

    const profile = await this.#profileService.update(
      userId,
      data,
      avatarLocalFile,
    );

    return ApiResponse.ok(res, "Profile updated successfully", profile);
  });
}

export default new ProfileController();
