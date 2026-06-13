import { verifyToken } from "../security/jwt.security.js";
import { TOKEN_TYPE } from "../../shared/constants/security.constants.js";
import ApiError from "../http/api.error.js";
import { userRepo } from "../../repository/auth.repository.js";

const authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      throw ApiError.unauthorized("Access token expired");
    }
    const decoded = await verifyToken(accessToken, TOKEN_TYPE.ACCESS);

    const user = await userRepo.findById(decoded.id);

    if (!user) {
      throw ApiError.unauthorized("User Not Found");
    }
  
    req.user = user;
   
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
