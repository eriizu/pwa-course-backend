import { start as startApp } from "./api";
import { start as startDb } from "./db";
import { TimerSheduler } from "./entities/TimerScheduler";

startDb().then(() => {
  startApp();
  TimerSheduler.enable();
});
