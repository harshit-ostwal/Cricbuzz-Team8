import ApiResponse from "../../core/http/api.response.js";

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

    return ApiResponse.ok(responseData, "Google login successful").send(res);
  }
}

export const authController = new AuthController();
