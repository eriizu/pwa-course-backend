import express, { Request, Response } from "express";
import { pushController } from "../../controllers";

export const router = express.Router({
  strict: true,
});

router.post("/", pushController.create);

router.get("/", pushController.read);

router.patch("/", pushController.update);

router.delete("/", pushController.delete);
