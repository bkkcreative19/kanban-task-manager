import { DataSource } from "typeorm";
import * as entities from "../entities";

const AppDataSource = new DataSource({
  name: "default",
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: Object.values(entities),
  synchronize: true,
  extra: {
    ssl: true,
  },
});

export { AppDataSource };
