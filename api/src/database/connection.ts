import { DataSource } from "typeorm";
import * as entities from "../entities";

const AppDataSource = new DataSource({
  type: "postgres",
  url: "postgres://hvmceoqdpdhzvu:5cda65b896ad178bd2d727d78edf4d24b7b5ebc7595cf5f786853accb141aae2@ec2-34-233-115-14.compute-1.amazonaws.com:5432/d5fm1ajpotufnt",
  entities: Object.values(entities),
  synchronize: true,
});

export { AppDataSource };
