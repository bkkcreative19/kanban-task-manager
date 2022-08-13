import { DataSource } from "typeorm";
import * as entities from "../entities";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
  entities: Object.values(entities),
  synchronize: true,
});

export { AppDataSource };
