import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { oauthConfig } from "../config/oauth.config.js";
import { authService } from "../auth.service.js";

const googleStrategy = new GoogleStrategy(
  {
    ...oauthConfig.google,
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
    
      const email = profile.emails?.[0]?.value;
     
      const data = {
        user: {
          name: profile.displayName,
          email,
          avatar: profile.photos?.[0]?.value,
        },
        account: {
          provider: "GOOGLE",
          providerId: profile.id,
        },
      };

      const result = await authService.googleLogin(data);
      return cb(null, result);
    } catch (error) {
      return cb(error, null);
    }
  },
);


export default googleStrategy