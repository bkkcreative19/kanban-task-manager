// import "dotenv/config";
// import "reflect-metadata";

import express from "express";
import cors from "cors";
// import morgan from "morgan";
import insertData from "./database/seed";
import fs from "fs";
// import { AppDataSource } from 'database/createConnection';
import { AppDataSource } from "./database/connection";
// import { findEntityOrThrow } from 'utils/typeorm';
import { router } from "./routes";
// import { Project } from 'entities';
// import { addRespondToResponse } from 'middleware/response';
// import resetDatabase from 'database/resetDatabase';
// import { authenticateUser } from 'middleware/authentication';
// import { handleError } from 'middleware/errors';
// import _createGuestAccount from 'database/createGuestAccount';
// import { RouteNotFoundError } from 'errors';

// import { attachPublicRoutes, attachPrivateRoutes } from './routes';
// import { findEntityOrThrow } from 'utils/typeorm';
// import { User } from 'entities';
const establishDatabaseConnection = async () => {
  // console.log(flatten(tasks));

  try {
    // PostgresDataSource.initialize()
    //   .then(() => {
    //     console.log('Data Source has been initialized!');
    //   })
    //   .catch(err => {
    //     console.error('Error during Data Source initialization', err);
    //   });
    await AppDataSource.initialize();
    // console.log("hi");
  } catch (error) {
    console.log(error);
  }
};

const initializeExpress = (): void => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  // app.use(morgan("tiny"));

  //   app.use(addRespondToResponse);

  //   attachPublicRoutes(app);

  app.get("/", async (_req, res) => {
    // await resetDatabase();
    // await createTestAccount();
    // await createGuestAccount();
    // const test = await findEntityOrThrow(User);
    // await insertData();
    // const boards = await insertData();
    res.send("his");
    // console.log(test);
  });
  app.use("/api", router);
  //   app.use("/", authenticateUser);

  //   attachPrivateRoutes(app);

  //   app.use((req, _res, next) => next(new RouteNotFoundError(req.originalUrl)));
  //   app.use(handleError);
  const PORT = process.env.PORT || 5000;

  app.listen(PORT);
};

const initializeApp = async (): Promise<void> => {
  await establishDatabaseConnection();
  initializeExpress();
};

// createTestAccount();
initializeApp();
