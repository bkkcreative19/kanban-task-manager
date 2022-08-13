"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const boards = __importStar(require("./controller/boards"));
const tasks = __importStar(require("./controller/tasks"));
const columns = __importStar(require("./controller/columns"));
const subtasks = __importStar(require("./controller/subtasks"));
const routes = (app) => {
    app.get("/boards", boards.getBoards);
    app.get("/boards/:boardId", boards.getBoardWithColumns);
    app.delete("/boards/:boardId", boards.deleteBoard);
    app.post("/boards", boards.createBoardWithColumns);
    app.put("/boards/:boardId", boards.editBoardWithColumns);
    app.get(`/tasks/:title`, tasks.getTaskAndSubtasks);
    app.post(`/tasks`, tasks.createTaskWithSubtasks);
    app.put(`/tasks/:taskId`, tasks.editTaskWithSubtasks);
    app.delete(`/tasks/:taskTitle`, tasks.deleteTask);
    app.delete("/subtasks/:subtaskId", subtasks.deleteSubtask);
    app.get("/columns/:boardId", columns.getColumns);
    app.post("/columns/:boardId", columns.addColumn);
    app.put("/columns/:boardId", columns.updateColumns);
    app.delete("/columns/:columnId", columns.deleteColumn);
};
exports.routes = routes;
//# sourceMappingURL=routes.js.map