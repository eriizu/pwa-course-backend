import { RequestHandler, Request } from "express";
import assert from "assert";
import {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT,
  Adapter as DiscordAdapter,
} from "../../adapter/discord";

class TokenRequest {
  constructor(req: Request) {
    this.client_id = CLIENT_ID;
    if (!CLIENT_SECRET) throw Error("No client secret in env");
    this.client_secret = CLIENT_SECRET;
    this.redirect_uri = REDIRECT;

    if (typeof req?.query?.code === "string") {
      this.grant_type = "authorization_code";
      this.code = req.query.code;
    } else if (typeof req?.query?.refresh_token === "string") {
      this.grant_type = "refresh_token";
      this.refresh_token = req.query.refresh_token;
    } else {
      throw Error(
        "Trying to exchange for access_token without a code or a refresh_token"
      );
    }
  }

  client_id: string;
  client_secret: string;
  grant_type: "authorization_code" | "refresh_token";
  redirect_uri: string;
  refresh_token?: string;
  code?: string;
}

export const get: RequestHandler = async (req, res) => {
  let form = new TokenRequest(req);
  console.log(form);
  if (form.grant_type && (form.code || form.refresh_token))
    try {
      let adapter = new DiscordAdapter();
      let result = await adapter.exchangeCode(form);
      res.send(result);
      console.log(await adapter.getSelf());
      //       await postLogin(result);
    } catch (err) {
      console.error("Failed to request token");
      console.error(err);
    }
};
