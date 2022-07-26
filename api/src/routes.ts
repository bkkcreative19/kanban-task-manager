import * as boards from "./controller/boards";
import * as tasks from "./controller/tasks";
import * as columns from "./controller/columns";

export const routes = (app: any): void => {
  app.get("/boards", boards.getBoards);
  app.get("/boards/:boardId", boards.getBoardWithColumns);

  app.post("/boards", boards.createBoardWithColumns);
  app.put("/boards/:boardId", boards.editBoardWithColumns);
  // task routes
  app.get(`/tasks/:title`, tasks.getTaskAndSubtasks);
  app.post(`/tasks`, tasks.createTaskWithSubtasks);

  // column routes
  app.get("/columns/:boardId", columns.getColumns);
  app.put("/columns/:boardId", columns.updateColumns);
};
