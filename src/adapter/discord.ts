import assert from "assert";
import bent from "bent";
import formurlencoded from "form-urlencoded";

export const CLIENT_ID = "809357769232351262";
assert(
  process.env.CLIENT_SECRET,
  'Client secret needs to be added to the process\' environment as "CLIENT_SECRET"'
);
export const CLIENT_SECRET = process.env.CLIENT_SECRET as string;
export const REDIRECT = "https://pwa.eriizu.fr/login";

export interface ITokenRequest {
  client_id: string;
  client_secret: string;
  grant_type: "authorization_code" | "refresh_token";
  redirect_uri: string;
  refresh_token?: string;
  code?: string;
}

export interface AccessAndRefreshTokens {
  access_token: string;
  refresh_token: string;
}

export function isAccessAndRefreshTokens(x: any): x is AccessAndRefreshTokens {
  return !!x.access_token && !!x.refresh_token;
}

export class Adapter {
  private _access_token?: string;

  constructor(token?: string) {
    this._access_token = token;
  }

  async set_access_token(token: string) {
    this._access_token = token;
    console.log(token);
  }

  get access_token() {
    return this._access_token;
  }

  get authRq() {
    return bent("https://discord.com/api/v6", "json", {
      Authorization: `Bearer ${this._access_token}`,
    });
  }
  get rq() {
    if (this._access_token)
      return bent("https://discord.com/api/v6", "json", {
        Authorization: `Bearer ${this._access_token}`,
      });
    else return bent("https://discord.com/api/v6", "json");
  }

  async exchangeCode(request: ITokenRequest) {
    const encoded_form = formurlencoded(request);

    let post = bent("POST", "json");
    let result = await post(
      "https://discord.com/api/v6/oauth2/token",
      encoded_form,
      {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    );
    console.log(result);
    if (isAccessAndRefreshTokens(result)) {
      await this.set_access_token(result.access_token);
    }
    return result;
  }

  async getSelf() {
    return this.authRq("/users/@me");
  }

  async getUser(id: string) {
    return this.authRq("/users/" + id);
  }
}
