import { verifyToken } from "../security/jwt.security.js";
import { TOKEN_TYPE } from "../../shared/constants/security.constants.js";
import ApiError from "../http/api.error.js";
import { userRepo } from "../../repository/auth.repository.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw ApiError.unauthorized("Access token missing");
    }

    const token = authHeader.split(" ")[1];

    const decoded = await verifyToken(token, TOKEN_TYPE.ACCESS);

    const user = await userRepo.findById(decoded.id);

    console.log("Authmiddleware -> ", user);

    if (!user) {
      throw ApiError.unauthorized("User Not Found");
    }

    req.user;

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
