/**
 * @flow Route → authenticate → authorize(SUPER_ADMIN, ADMIN) → validation → controller → service → repository → model
 */

import createRouter from "../../core/factories/router.factory.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import authMiddleware from "../../core/middlewares/auth.middleware.js";
import { authoriztionMiddleware } from "../../core/middlewares/auth.middleware.js";
import validate from "../../core/middlewares/validation.middleware.js";
import { ROLES } from "../../shared/constants/user.constants.js";
import { seriesController } from "./series.controller.js";
const router = createRouter();

/**
 * @create POST /
 * @access Private
 * @description create series
 */

router.post(
  "/",
  authMiddleware,
  authoriztionMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  validate, asyncHandler(seriesController.createSeries.bind(seriesController))
);


/**
 * @route Get /
 * @access Public
 * @description get all series 
 */

router.get('/' , asyncHandler(seriesController.getAllSeries.bind(seriesController)))

export default router;
