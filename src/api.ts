import express from "express";
import { PORT } from "./config/constants";
import * as routes from "./routes";

const app = express();
app.use(express.json());

app.use("/timers", routes.timer);
app.use("/pushes", routes.push);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
