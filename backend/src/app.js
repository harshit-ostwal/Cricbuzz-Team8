import cors from "cors";
import express from "express";
import { NODE_ENV } from "./config/env.config.js";
import { corsConfig } from "./config/security/cors.config.js";
import securityMiddleware from "./core/middlewares/security.middleware.js";
import staticMiddleware from "./core/middlewares/static.middleware.js";
import { API_PREFIX, API_VERSION } from "./shared/constants/api.constants.js";
import { APP_NAME } from "./shared/constants/app.constants.js";
import passprot from 'passport' 
import { passportInit } from "./modules/auth/config/passport.config.js";
import errorHandler from "./core/middlewares/error.middleware.js";
const app = express();

// Set application-level settings
app.set("title", `${APP_NAME} API Server (${API_VERSION})`);
app.set("env", NODE_ENV);

// Json Formattings
app.set("json escape", true);
app.set("json spaces", 2);

app.set("strict routing", true);
app.set("trust proxy", "loopback");
app.set("x-powered-by", true);

securityMiddleware(app);

app.use(cors(corsConfig));

staticMiddleware(app);

import router from "./routes/index.js";

passportInit()
app.use(passprot.initialize());

app.use(API_PREFIX, router);

app.use(errorHandler)
export { app };
