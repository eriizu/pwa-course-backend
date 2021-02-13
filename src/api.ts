import cors from "cors";
import express from "express";
import { PORT } from "./config/constants";
import * as routes from "./routes";

function start() {
  const app = express();
  setupMiddleware(app);

  app.use("/timers", routes.timer);
  app.use("/pushes", routes.push);
  app.use("/discord", routes.discord);

  return app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

function setupMiddleware(app: express.Application) {
  app.use(express.json());
  app.use(cors());

  // app.options("*", cors());
  app.options(
    "*",
    (req, resp, next) => {
      next();
    },
    cors({ maxAge: 84600 })
  );
}

export { start, setupMiddleware };
