import * as boards from "./controller/boards";

export const routes = (app: any): void => {
  app.get("/boards", boards.getBoards);
  app.get("/boards/:boardId", boards.getBoardWithColumns);

  app.post("/boards", boards.createBoardWithColumns);
};
