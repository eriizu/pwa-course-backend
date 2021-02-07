import "reflect-metadata";
import { createConnection } from "typeorm";
import {
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  POSTGRES_HOST,
} from "../config/constants";

import { Push } from "../entities/Push";
import { Timer } from "../entities/Timer";

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
    host: POSTGRES_HOST,
    entities: [Push, Timer],
    synchronize: true,
  });
  console.log("database is ready");
  return conn;
}

async function startTest(testname: string) {
  let conn = await createConnection({
    type: "sqljs",
    entities: [Push, Timer],
    synchronize: true,
    dropSchema: true,
  });
  return conn;
  // return createConnection({
  //   type: "better-sqlite3",
  //   database: "db.test.sqlite",
  //   entities: [Push, Timer],
  //   synchronize: true,
  // });
}

export { start, startTest };
