import { body } from "express-validator";
import { ROLES } from "../../shared/constants/user.constants.js";
import {
  REGEX_LOWERCASE,
  REGEX_NUMBER,
  REGEX_SPECIAL_CHAR,
  REGEX_UPPERCASE,
  REGEX_EMAIL,
} from "../../shared/constants/regex.constants.js";

export default  [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must be between 3 and 30 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .matches(REGEX_EMAIL)
    .withMessage("Invalid email"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password muct be at least 8 characters")
    .matches(REGEX_LOWERCASE)
    .withMessage("Password must contain  at least 1 Lowercase letter")
    .matches(REGEX_UPPERCASE)
    .withMessage("Password must contain  at least 1 Uppercase letter")
    .matches(REGEX_NUMBER)
    .withMessage("Password must contain  at least 1 Number")
    .matches(REGEX_SPECIAL_CHAR)
    .withMessage("Password must contain at least 1 Special character"),

  body("role")
    .optional()
    .isIn(Object.values(ROLES))
    .withMessage("Invalid role"),
];
