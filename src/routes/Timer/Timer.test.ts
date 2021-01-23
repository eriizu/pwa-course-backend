import { router } from "./Timer";
import express from "express";
import request from "supertest";

let app = express();
app.use(router);

it("should get timers", async () => {
  let res = await request(app).get("/");
  expect(res.status).toBe(200);
  return;
});
