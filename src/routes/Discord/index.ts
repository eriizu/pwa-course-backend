import express, { Request, Response } from "express";
import { get } from "./AccessToken";

export const router = express.Router({
  strict: true,
});

router.get("/access_token", get);
