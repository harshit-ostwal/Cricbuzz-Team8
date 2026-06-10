import { createRouter } from "../core/factories/router.factory.js";

const router = createRouter();

router.get("/health", (_, res) => {
  return res.status(200).json({ status: "OK", message: "Server is healthy!" });
});

export default router;
