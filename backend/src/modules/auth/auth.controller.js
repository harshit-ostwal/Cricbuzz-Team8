import ApiResponse from "../../core/http/api.response.js";
import { setAuthCookies } from "../../shared/utils/cookie.utils.js";
import { UserDto } from "../user/user.dto.js";
import { authService } from "./auth.service.js";

class AuthController {
  async oauthController(req, res) {
    const responseData = req.user;
    
    setAuthCookies(res, responseData.accessToken, responseData.refreshToken);
    // res.redirect('http://localhost:5173')
    return ApiResponse.ok(new UserDto(responseData.user), "Google login successful").send(res);
    
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
