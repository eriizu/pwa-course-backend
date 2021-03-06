import express, { Request, Response } from "express";
import { Timer, Interval as TimerInterval } from "../../entities/Timer";
import { TimerSheduler } from "../../entities/TimerScheduler";

export const router = express.Router({
  strict: true,
});

router.post("/", async (req, res) => {
  let body: Partial<Timer> = req.body;
  if (body.next) body.next = new Date(body.next);
  if (body?.next instanceof Date) {
    var interval: Partial<TimerInterval> = {};
    if (body?.repeats?.hours || body?.repeats?.months) {
      interval = body.repeats;
    }

    let timer = new Timer(body.next, interval);

    await timer.save();
    TimerSheduler.enable();
    res.status(201).send(timer);
  } else {
    res.sendStatus(400);
  }
});

router.get("/", async (req, res) => {
  let timers = await Timer.find();
  res.send(timers);
});

router.put("/", (req, res) => {
  res.sendStatus(404);
});

router.delete("/", (req, res) => {
  res.sendStatus(404);
});
