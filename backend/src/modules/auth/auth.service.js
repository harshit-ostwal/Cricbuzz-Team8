import AuthRepository from "../../repository/auth.repository.js";
import { generateTokens } from "../../core/security/jwt.security.js";
import ApiError from "../../core/http/api.error.js";
import { compareHash, hashValue } from "../../core/security/hash.security.js";
import { sanitizeUser } from "../../shared/utils/sanitizeUser.utils.js";
import { email } from "zod";
class AuthService {
  constructor() {
    this.userRepo = new AuthRepository();
  }

  async findOrCreateOAuthUser(profile, provider) {
    if (!profile) {
      throw ApiError.badRequest(`${provider} profile is required`);
    }
   

    const providerId = profile?.account?.providerId;
    const email = profile?.user?.email;
    const name = profile?.user?.name || profile.username || "OAuth User";
    const avatar = profile?.user?.avatar || "";
   
    if (!email) {
      throw ApiError.validationError(`${provider} account must provide an email`);
    }

    let user = await this.userRepo.findUserByProvider(provider, providerId);

    if (user) {
      return user;
    }

    user = await this.userRepo.findByEmail(email);

    if (user) {
      return await this.userRepo.updateById(user._id, {
        provider,
        providerId,
        profileImage: avatar || user.ProfileImage,
      });
    }

    return await this.userRepo.create({
      name,
      email,
      profileImage: avatar,
      provider,
      providerId,
    });
  }

  async oauthLogin(profile, provider) {
    try {
      const user = await this.findOrCreateOAuthUser(profile, provider);

      const tokens = generateTokens(user);

      return {
        user: sanitizeUser(user),
        ...tokens,
      };
    } catch (error) {
      throw ApiError.from(error);
    }
  }

  async googleLogin(profile) {
    return this.oauthLogin(profile, "GOOGLE");
  }

  async githubLogin(profile) {
    return this.oauthLogin(profile, "GITHUB");
  }

  async register(data) {
    const { name, email, password, role } = data;

    const existingUser = await this.userRepo.findByEmail(email);

    if (existingUser) {
      throw ApiError.conflict("User already exists with this email");
    }

    const hashedPassword = await hashValue(password);

    const newUser = await this.userRepo.create({
      name,
      email,
      password: hashedPassword,
      role,
      provider: "LOCAL",
    });

    const tokens = generateTokens(newUser);

    return {
      user: sanitizeUser(newUser),
      ...tokens,
    };
  }

  async login(data) {
    const { email, password } = data;

    const user = await this.userRepo.findByEmailWithPassword(email);

    if (!user) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    if (!user.password) {
      throw ApiError.badRequest(
        "This account was created using Google/GitHub. Please login with OAuth."
      );
    }

    const isPasswordValid = await compareHash(password, user.password);

    if (!isPasswordValid) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    const tokens = generateTokens(user);

    return {
      user: sanitizeUser(user),
      ...tokens,
    };
  }
}

export const authService = new AuthService();