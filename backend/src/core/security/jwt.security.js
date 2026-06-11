import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY_MS,
  REFRESH_TOKEN_SECRET,
} from "../../config/env.config.js";
import {
  APP_NAME,
  DEVELOPER_NAME,
} from "../../shared/constants/app.constants.js";
import {
  JWT_ALGORITHM,
  TOKEN_TYPE,
} from "../../shared/constants/security.constants.js";
import ApiError from "../http/api.error.js";
import { hashToken } from "./hash.security.js";

const generateToken = (user, type) => {
  const token = jwt.sign(
    {
      id: user.id,
    },
    type === TOKEN_TYPE.ACCESS ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET,
    {
      algorithm: JWT_ALGORITHM,
      expiresIn:
        type === TOKEN_TYPE.ACCESS ? ACCESS_TOKEN_EXPIRY : REFRESH_TOKEN_EXPIRY,
      issuer: `${APP_NAME} - ${DEVELOPER_NAME}`,
      audience: `${APP_NAME} - Users`,
      jwtid: crypto.randomUUID(),
    },
  );

  if (type === TOKEN_TYPE.ACCESS) {
    return { token };
  }

  const hashedToken = hashToken(token);
  return { token, hashedToken };
};

const verifyToken = (token, type) => {
  try {
    return jwt.verify(
      token,
      type === TOKEN_TYPE.ACCESS ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET,
      {
        algorithms: [JWT_ALGORITHM],
        issuer: `${APP_NAME} - ${DEVELOPER_NAME}`,
        audience: `${APP_NAME} - Users`,
      },
    );
  } catch (error) {
    throw error.name === "TokenExpiredError"
      ? ApiError.unauthorized("Token has expired", error)
      : ApiError.unauthorized("Invalid token", error);
  }
};

const generateTokens = (user) => {
  const accessToken = generateToken(user, TOKEN_TYPE.ACCESS);
  const refreshToken = generateToken(user, TOKEN_TYPE.REFRESH);

  return {
    accessToken: accessToken.token,
    refreshToken: refreshToken.token,

    hashedRefreshToken: refreshToken.hashedToken,
    refreshTokenExpiresAt: new Date(
      Date.now() + parseInt(REFRESH_TOKEN_EXPIRY_MS, 10),
    ),
  };
};

export { generateToken, generateTokens, verifyToken };
