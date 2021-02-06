import { startTest } from "../db";
import { Timer } from "./Timer";
import { Connection } from "typeorm";

var conn: Connection;

let timers = [
  new Timer(new Date("2021-02-06T14:22:32+01:00")),
  new Timer(new Date("2021-02-06T14:24:32+01:00")),
  new Timer(new Date("2021-01-01T14:22:32+01:00")),
  new Timer(new Date("2021-02-06T04:22:32+01:00")),
  new Timer(new Date("2024-02-06T04:22:32+01:00")),
];

beforeAll(async () => {
  conn = await startTest("timerTest");
  for (let timer of timers) {
    await timer.save();
  }

  return;
});

afterAll(async () => {
  if (conn) await Promise.all([conn.close()]);
});

it("should get the next occurence", async () => {
  let nextOne = await Timer.getNextOccurence();
  expect(nextOne?.next).toEqual(timers[2].next);
});

it("should get the due occurences", async () => {
  let dues = await Timer.findDue();

  expect(dues.length).toEqual(4);
});
