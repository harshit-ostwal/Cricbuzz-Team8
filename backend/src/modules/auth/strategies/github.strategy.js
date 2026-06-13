import { Strategy as GitHubStrategy } from "passport-github2";
import { oauthConfig } from "../config/oauth.config.js";
import { authService } from "../auth.service.js";

const gitHubStrategy = new GitHubStrategy(
  {
    ...oauthConfig.github,
  },
  async (accessToken, refreshTOken, profile, cb) => {
    try {
    
      const email = profile.emails?.[0]?.value;

      const data = {
        user: {
          name: profile.displayName || profile.username,
          email,
          avatar: profile.photos?.[0]?.value,
        },
        account: {
          provider: "GITHUB",
          providerId: profile.id,
        },
      };

      const result = await authService.githubLogin(data);

      return done(null, result);
    } catch (error) {
      return cb(error, null);
    }
  },
);

export default gitHubStrategy
