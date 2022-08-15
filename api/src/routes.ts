import * as boards from "./controller/boards";
import * as tasks from "./controller/tasks";
import * as columns from "./controller/columns";
import * as subtasks from "./controller/subtasks";

export const routes = (app: any): void => {
  app.get("/api/boards", boards.getBoards);
  app.get("/api/boards/:boardId", boards.getBoardWithColumns);
  app.delete("/api/boards/:boardId", boards.deleteBoard);

  app.post("/api/boards", boards.createBoardWithColumns);
  app.put("/api/boards/:boardId", boards.editBoardWithColumns);

  // task routes
  app.get(`/api/tasks/:title`, tasks.getTaskAndSubtasks);
  app.post(`/api/tasks`, tasks.createTaskWithSubtasks);
  app.put(`/api/tasks/:taskId`, tasks.editTaskWithSubtasks);
  app.delete(`/api/tasks/:taskTitle`, tasks.deleteTask);

  // subtask routes
  app.delete("/api/subtasks/:subtaskId", subtasks.deleteSubtask);
  // column routes
  app.get("/api/columns/:boardId", columns.getColumns);
  app.post("/api/columns/:boardId", columns.addColumn);
  app.put("/api/columns/:boardId", columns.updateColumns);
  app.delete("/api/columns/:columnId", columns.deleteColumn);
};
