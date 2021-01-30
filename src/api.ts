import express from "express";
import { PORT } from "./config/constants";
import * as routes from "./routes";

function start() {
  const app = express();
  app.use(express.json());

  app.use("/timers", routes.timer);
  app.use("/pushes", routes.push);

  return app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

export { start };
