import { router } from "./Timer";
import express from "express";
import request from "supertest";
import { startTest } from "../../db";
import { Connection } from "typeorm";

let app = express();
app.use(router);

var conn: Connection;

beforeAll(async () => {
  conn = await startTest("timerTest");
  return;
});

afterAll(async () => {
  if (conn) await Promise.all([conn.close()]);
});

it("should get timers", async () => {
  await request(app).get("/").expect(200);
  // let res = await request(app).get("/").expect(200);
  // expect(res.status).toBe(200);
  return;
});
