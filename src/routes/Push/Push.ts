import express, { Request, Response } from "express";
import { Push } from "../../entities/Push";

export const router = express.Router({
  strict: true,
});

import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:sysadmin@eiss.fr",
  "BPdTu_dImk8UZqr1-paVPIUjGjaWbLRRRlXTt4D7FqzxtVAvvzdyQd7eeIboxZdX2Jx_-oVKXSOhTQG-XXOuRwo",
  "YMC6vjtkDKwgHnyvJKwAfHOMm8PLpK1MIit15HFli2A"
);

// router.post("/", pushController.create);

router.post("/", async (req, res) => {
  let subscription: Parameters<typeof webpush.sendNotification>[0] = req.body;
  let payload = {
    notification: {
      title: "Testing testing one two three",
      body: "bonjoir",
      data: {
        url: "https://e89.eiss.fr",
      },
    },
  };

  let pushEntry = new Push(JSON.stringify(subscription));

  try {
    await pushEntry.save();
    await webpush.sendNotification(subscription, JSON.stringify(payload), {});
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }

  return;
});

// router.patch("/", pushController.update);

// router.delete("/", pushController.delete);
