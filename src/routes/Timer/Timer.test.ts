import { router } from "./Timer";
import express from "express";
import request from "supertest";

let app = express();
app.use(router);

it("should get timers", async () => {
  await request(app).get("/").expect(200);
  // let res = await request(app).get("/").expect(200);
  // expect(res.status).toBe(200);
  return;
});
