import { email } from "zod";
import ApiResponse from "../../core/http/api.response.js";
import { setAuthCookies } from "../../shared/utils/cookie.utils.js";
import { authService } from "./auth.service.js";

class AuthController {
  async googleCallback(req, res) {
    const result = req.user;

    const user = {
      id: result._doc._id,
      name: result._doc.name,
      email: result._doc.email,
      role: result._doc.role,
      isDeleted: result._doc.isDeleted,
      createdAt: result._doc.createdAt,
      updatedAt: result._doc.updatedAt,
    };
    const responseData = {
      user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    };

    setAuthCookies(res, responseData.accessToken, responseData.refreshToken);

    return ApiResponse.ok(responseData, "Google login successful").send(res);
  }

  async register(req, res) {
    const data = await authService.register(req.body);

    const user = {
      name: data.name,
      email: data.email,
      role: data.role,
      isDeleted: data.isDeleted,
      profileImage: data.profileImage,
      _id: data._id,
    };

    const tokens = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };

    setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

    return ApiResponse.created(user, "User Register Successfully ").send(res);
  }

  async login(req, res) {
    const data = await authService.login(req.body);

    const user = {
      name: data.name,
      email: data.email,
      role: data.role,
      isDeleted: data.isDeleted,
      profileImage: data.profileImage,
      _id: data._id,
    };

    const tokens = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
    setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

    return ApiResponse.ok(user, "User login successfully").send(res);
  }
}

export const authController = new AuthController();
