import { startTest } from "../db";
import { Timer } from "./Timer";
import { Connection } from "typeorm";

var conn: Connection;

beforeAll(async () => {
  conn = await startTest("timerTest");
  return;
});

afterAll(async () => {
  if (conn) await Promise.all([conn.close()]);
});

it("should get the next occurence", async () => {
  let timers = [
    new Timer(new Date("2021-02-06T14:22:32+01:00")),
    new Timer(new Date("2021-02-06T14:24:32+01:00")),
    new Timer(new Date("2021-01-01T14:22:32+01:00")),
    new Timer(new Date("2021-02-06T04:22:32+01:00")),
  ];

  for (let timer of timers) {
    await timer.save();
  }

  let nextOne = await Timer.getNextOccurence();
  expect(nextOne?.next).toEqual(timers[2].next);
});
