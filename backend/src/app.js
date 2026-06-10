import dotenv from "dotenv";

dotenv.config();

import express from "express";
import { API_PREFIX, API_VERSION } from "./shared/constants/api.constants.js";
import { APP_NAME } from "./shared/constants/app.constants.js";

const app = express();

// Set application-level settings
app.set("title", `${APP_NAME} API Server (${API_VERSION})`);
app.set("env", process.env.NODE_ENV);

import router from "./routes/index.js";

app.use(API_PREFIX, router);

export { app };
