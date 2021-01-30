import { start as startApp } from "./api";
import { start as startDb } from "./db";

startDb().then(() => {
  startApp();
});
