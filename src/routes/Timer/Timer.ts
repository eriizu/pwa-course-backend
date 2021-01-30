import express, { Request, Response } from "express";

export const router = express.Router({
  strict: true,
});

router.post("/", (req, res) => {
  res.sendStatus(404);
});

router.get("/", (req, res) => {
  res.send({});
});

router.put("/", (req, res) => {
  res.sendStatus(404);
});

router.delete("/", (req, res) => {
  res.sendStatus(404);
});
