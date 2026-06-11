/** biome-ignore-all lint/suspicious/noConsole: <> */
import createApp from "./app.js";
import env from "./config/env.js";
import logger from "./config/logger.js";
import connectDB from "./database/db.js";
const app = createApp();
function startServer() {
  connectDB()
    .then(() => {
      app.listen(env.PORT, () => {
        logger.info({ PORT: env.PORT }, "Server is running on port");
      });
    })
    .catch((err) => {
      logger.warn({ error: err }, "Database connection failed");
    });
}

startServer();
