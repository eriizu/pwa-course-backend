import "reflect-metadata";
import { createConnection } from "typeorm";
import { POSTGRES_PASSWORD, POSTGRES_USER } from "../config/constants";

import { Push } from "../entities/Push";

async function start() {
  // let conn = await createConnection({
  //   type: "better-sqlite3",
  //   database: "db.sqlite",
  //   entities: [Push],
  //   synchronize: true,
  // });
  let conn = await createConnection({
    type: "postgres",
    username: POSTGRES_PASSWORD,
    password: POSTGRES_USER,
    entities: [Push],
    synchronize: true,
  });
  console.log("database is ready");
  return conn;
}

export { start };
