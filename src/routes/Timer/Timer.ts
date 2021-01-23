import express, { Request, Response } from "express";
import { timerController } from "../../controllers";

export const router = express.Router({
  strict: true,
});

router.post("/", timerController.create);

router.get("/", timerController.read);

router.patch("/", timerController.update);

router.delete("/", timerController.delete);
