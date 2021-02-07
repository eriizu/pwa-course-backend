import { router } from "./Timer";
import express from "express";
import request from "supertest";
import { startTest } from "../../db";
import { Connection } from "typeorm";

import moment from "moment";
import { Timer } from "../../entities/Timer";
import { setupMiddleware } from "../../api";
import { TimerSheduler } from "../../entities/TimerScheduler";

let app = express();
setupMiddleware(app);
app.use(router);

var conn: Connection;

beforeAll(async () => {
  conn = await startTest("timerTest");
  return;
});

afterAll(async () => {
  if (conn) await Promise.all([conn.close()]);
  TimerSheduler.disable();
});

it("should get timers", async () => {
  await request(app).get("/").expect(200);
  // let res = await request(app).get("/").expect(200);
  // expect(res.status).toBe(200);
  return;
});

it("should post a timer and find it afterwars", async () => {
  let date = moment();

  date.add(1, "day");
  let timer = { next: date.toDate(), repeats: { hours: 24 } };

  await request(app).post("/").send(timer).expect(201);

  let res = await request(app).get("/").expect(200);
  let timers = res.body as Array<Timer>;
  let found = false;

  for (let entry of timers) {
    if (
      entry.next == timer.next &&
      entry.repeats.hours == timer.repeats.hours &&
      entry.repeats.months == 0
    ) {
      found = true;
    }
    break;
  }
  expect(found);
  // let res = await request(app).get("/").expect(200);
  // expect(res.status).toBe(200);
  return;
});
