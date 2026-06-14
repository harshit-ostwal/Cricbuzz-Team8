import { body, param } from "express-validator";

export const createSeriesValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Series name is required"),

  body("shortName")
    .trim()
    .notEmpty()
    .withMessage("Short name is required"),

  body("season")
    .trim()
    .notEmpty()
    .withMessage("Season is required"),

  body("status")
    .optional()
    .isIn(["UPCOMING", "LIVE", "COMPLETED"])
    .withMessage("Invalid series status"),

  body("logo")
    .optional()
    .isString()
    .withMessage("Logo must be a string"),
];

export const updateSeriesValidation = [
  body("name").optional().trim().notEmpty(),
  body("shortName").optional().trim().notEmpty(),
  body("season").optional().trim().notEmpty(),

  body("status")
    .optional()
    .isIn(["UPCOMING", "LIVE", "COMPLETED"])
    .withMessage("Invalid series status"),

  body("logo")
    .optional()
    .isString()
    .withMessage("Logo must be a string"),
];

export const mongoIdValidation = [
  param("id").isMongoId().withMessage("Invalid series id"),
];