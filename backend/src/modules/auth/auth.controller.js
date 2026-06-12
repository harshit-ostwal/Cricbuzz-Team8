import ApiResponse from "../../core/http/api.response.js";
import { setAuthCookies } from "../../shared/utils/cookie.utils.js";
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
    
    setAuthCookies(res , responseData.accessToken , responseData.refreshToken)

    return ApiResponse.ok(responseData, "Google login successful").send(res);
  }

  async  login(req, res) {
    
  }
}

export const authController = new AuthController();
