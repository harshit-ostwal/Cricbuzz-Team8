import process from "node:process";
import { APP_NAME } from "../../shared/constants/app.constants.js";

const runtimeEnv = process.env.NODE_ENV ?? "development";

const loggerConfig = {
  level: runtimeEnv === "development" ? "debug" : "info",
  handleExceptions: true,
  handleRejections: true,
  defaultMeta: {
    service: APP_NAME,
  },
  silent: runtimeEnv === "testing",
  exitOnError: false,
};

export default loggerConfig;
