import * as boards from "./controller/boards";
import * as tasks from "./controller/tasks";
import * as columns from "./controller/columns";
import * as subtasks from "./controller/subtasks";

export const routes = (app: any): void => {
  app.get("/boards", boards.getBoards);
  app.get("/boards/:boardId", boards.getBoardWithColumns);
  app.delete("/boards/:boardId", boards.deleteBoard);

  app.post("/boards", boards.createBoardWithColumns);
  app.put("/boards/:boardId", boards.editBoardWithColumns);

  // task routes
  app.get(`/tasks/:title`, tasks.getTaskAndSubtasks);
  app.post(`/tasks`, tasks.createTaskWithSubtasks);
  app.put(`/tasks/:taskId`, tasks.editTaskWithSubtasks);

  // subtask routes
  app.delete("/subtasks/:subtaskId", subtasks.deleteSubtask);
  // column routes
  app.get("/columns/:boardId", columns.getColumns);
  app.post("/columns/:boardId", columns.addColumn);
  app.put("/columns/:boardId", columns.updateColumns);
  app.delete("/columns/:columnId", columns.deleteColumn);
};
