import { cookieAccessOptions } from "../../config/security/cookie.config.js";
import ApiResponse from "../../core/http/api.response.js";
import { setAuthCookies } from "../../shared/utils/cookie.utils.js";
import { UserDto } from "./auth.dto.js";
import { authService } from "./auth.service.js";

class AuthController {
  // OuathController 
  async oauthController(req, res) {
    const responseData = req.user;

    setAuthCookies(res, responseData.accessToken, responseData.refreshToken);
    // res.redirect('http://localhost:5173')
    return ApiResponse.ok(
      new UserDto(responseData.user),
      "Google login successful",
    ).send(res);
  }
// register 
  async register(req, res) {
    const responseData = await authService.register(req.body);

    setAuthCookies(res, responseData.accessToken, responseData.refreshToken);

    return ApiResponse.created(
      new UserDto(responseData.user),
      "User Register Successfully ",
    ).send(res);
  }
 
  // login 
  async login(req, res) {
    const responseData = await authService.login(req.body);

    setAuthCookies(res, responseData.accessToken, responseData.refreshToken);

    return ApiResponse.ok(
      new UserDto(responseData.user),
      "User login successfully",
    ).send(res);
  }


  // refrash token 

  async refreshToken(req, res){
    const refreshToken = req.cookies?.refreshToken;

    const accessToken = await authService.refreshToken(refreshToken)
   
    res.cookie('accessToken',accessToken, cookieAccessOptions)

    ApiResponse.ok('accessToken create successfully').send(res)
    
  }


  async me(req, res) {
   
    ApiResponse.ok(new UserDto(req.user), "User Verified").send(res)
  }
  

}

export const authController = new AuthController();
