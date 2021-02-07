import express from "express";
import { PORT } from "./config/constants";
import * as routes from "./routes";

function start() {
  const app = express();
  setupMiddleware(app);

  app.use("/timers", routes.timer);
  app.use("/pushes", routes.push);

  return app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

function setupMiddleware(app: express.Application) {
  app.use(express.json());
}

export { start, setupMiddleware };
