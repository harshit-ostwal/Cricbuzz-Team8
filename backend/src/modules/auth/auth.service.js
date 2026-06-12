import UserRepository from "../../repository/user.repository.js";
import { generateTokens } from "../../core/security/jwt.security.js";
import ApiError from "../../core/http/api.error.js";
import { hashValue } from "../../core/security/hash.security.js";
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

  async register(data) {
    const { name, email, password, role } = data;

    // check user exist or not already register thow error
    const existingUser = await this.userRepo.findByEmail(email);

    if (existingUser) {
      throw ApiError.conflict("User already exists with this email");
    }

    // If User is new generate hashPassword and create new user in db
    const hashPassword = await hashValue(password);

    let newUser = await this.userRepo.create({
      name,
      email,
      password: hashPassword,
      role,
    });
 
    if (!newUser) {
        throw  ApiError.badRequest("User could not be created")
    }
    
    // generate token 
    
    const tokens = await generateTokens(newUser)

    if (!tokens) {
       throw  ApiError.internalServerError("Failed to generate tokens")
    }
  
     newUser = {...newUser._doc , ...tokens}
     return newUser
  }
}

export const authService = new AuthService();
