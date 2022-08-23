import express from "express";
import cors from "cors";
import morgan from "morgan";

import { AppDataSource } from "./database/connection";

import { router } from "./routes";

const establishDatabaseConnection = async () => {
  // console.log(flatten(tasks));

  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.log(error);
  }
};

const initializeExpress = (): void => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(morgan("tiny"));

  app.get("/", async (_req, res) => {
    res.send("his");
  });
  app.use("/api", router);

  const PORT = process.env.PORT || 5000;

  app.listen(5001);
};

const initializeApp = async (): Promise<void> => {
  await establishDatabaseConnection();
  initializeExpress();
};

initializeApp();
