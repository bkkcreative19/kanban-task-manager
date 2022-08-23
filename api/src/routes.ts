import express from "express";

import * as boards from "./controller/boards";
import * as tasks from "./controller/tasks";
import * as columns from "./controller/columns";
import * as subtasks from "./controller/subtasks";

export const router = express.Router();

router.get("/boards", boards.getBoards);
router.get("/boards/:boardId", boards.getBoardWithColumns);
router.delete("/boards/:boardId", boards.deleteBoard);

router.post("/boards", boards.createBoardWithColumns);
router.put("/boards/:boardId", boards.editBoardWithColumns);

// task routes
router.get(`/tasks/:title`, tasks.getTaskAndSubtasks);
router.post(`/tasks`, tasks.createTaskWithSubtasks);
router.put(`/tasks/:taskId`, tasks.editTaskWithSubtasks);
router.put(`/drag-task/:taskId`, tasks.dragTask);
router.delete(`/tasks/:taskTitle`, tasks.deleteTask);

// subtask routes
router.delete("/subtasks/:subtaskId", subtasks.deleteSubtask);
// column routes
router.get("/columns/:boardId", columns.getColumns);
router.post("/columns/:boardId", columns.addColumn);
router.put("/columns/:boardId", columns.updateColumns);
router.delete("/columns/:columnId", columns.deleteColumn);
