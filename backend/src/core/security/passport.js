import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {authService} from "../../modules/auth/auth.service.js";
import { GOOGLE_CALLBACK_URL,GOOGLE_CLIENT_ID ,GOOGLE_CLIENT_SECRET } from "../../config/env.config.js";
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, cb) => {
      try {     
        const result = await authService.googleLogin(profile)       
        return cb(null, result);
      } catch (error) {
        return cb(error, null);
      }
    },
  ),
);

export default passport;
