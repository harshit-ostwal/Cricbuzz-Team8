// import {
//   cookieAccessOptions,
//   cookieRefreshOptions,
// } from "../../config/cors.config.js";

import {
   app_config
} from '.././constants/app.constants.js'

const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, app_config.cookie.cookieAccessOptions);
  res.cookie("refreshToken", refreshToken, app_config.cookie.cookieRefreshOptions);
};

const clearAuthCookies = (res) => {
  res.clearCookie("accessToken", cookieAccessOptions);
  res.clearCookie("refreshToken", cookieRefreshOptions);
};

export { clearAuthCookies, setAuthCookies };
