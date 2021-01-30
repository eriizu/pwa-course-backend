import express, { Request, Response } from "express";

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

router.get("/", (req, res) => {
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

  webpush.sendNotification(subscription, JSON.stringify(payload), {});
  res.sendStatus(201);
});

// router.patch("/", pushController.update);

// router.delete("/", pushController.delete);
