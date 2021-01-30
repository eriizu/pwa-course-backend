import "reflect-metadata";
import { createConnection } from "typeorm";

import { Push } from "../entities/Push";

async function start() {
  let conn = await createConnection({
    type: "sqlite",
    database: "db.sqlite",
    entities: [Push],
    synchronize: true,
  });
  console.log("database is ready");
  return conn;
}

export { start };
