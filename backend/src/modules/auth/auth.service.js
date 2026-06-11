import UserRepository from "../../repository/user.repository.js";
import { generateTokens } from "../../core/security/jwt.security.js";
import ApiError from "../../core/http/api.error.js";

class AuthService {
  constructor() {
    this.userRepo = new UserRepository();
  }

  async findOrCreateGoogleUser(profile) {
    if (!profile) {
      throw ApiError.badRequest("Google profile is required");
    }

    const googleId = profile.id;
    const email = profile.emails?.[0]?.value;
    const name = profile.displayName;
    const avatar = profile.photos?.[0]?.value || "";

    if (!email) {
      throw ApiError.validationError("Google account must provide an email");
    }

    let user = await this.userRepo.findByGoogleId(googleId);

    if (user) {
      return user;
    }

    // If user not found, create new
    return await this.userRepo.create({
      name,
      email,
      avatar,
      provider: "GOOGLE",
      googleId,
    });
  }

  async googleLogin(profile) {
    try {
      const user = await this.findOrCreateGoogleUser(profile);

      if (!user) {
        throw ApiError.notFound("User could not be created or found");
      }

      const tokens = await generateTokens(user);

      if (!tokens) {
        throw ApiError.internalServerError("Failed to generate tokens");
      }

      return {
        ...user, 
        ...tokens,
      };
    } catch (error) {
      throw ApiError.from(error);
    }
  }
}

export const authService = new AuthService();
