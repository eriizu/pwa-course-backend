import { Request, Response } from "express";
import { CrudController } from "../CrudController";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:sysadmin@eiss.fr",
  "BPdTu_dImk8UZqr1-paVPIUjGjaWbLRRRlXTt4D7FqzxtVAvvzdyQd7eeIboxZdX2Jx_-oVKXSOhTQG-XXOuRwo",
  "YMC6vjtkDKwgHnyvJKwAfHOMm8PLpK1MIit15HFli2A"
);

export class PushController extends CrudController {
  public create(req: Request, res: Response): void {
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
  }

  public read(req: Request, res: Response): void {
    // res.json({ message: "GET /user request received" });
    throw new Error("Method not implemented.");
  }

  public update(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }

  public delete(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }
}
