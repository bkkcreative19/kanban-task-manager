"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.editTaskWithSubtasks = exports.createTaskWithSubtasks = exports.getTaskAndSubtasks = void 0;
const entities_1 = require("../entities");
const errors_1 = require("../errors");
const typeorm_1 = require("../utils/typeorm");
exports.getTaskAndSubtasks = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield (0, typeorm_1.findEntityOrThrow)(entities_1.Task, {
        where: {
            title: req.params.title,
        },
        relations: ["subtasks"],
    });
    res.json(task[0]);
}));
exports.createTaskWithSubtasks = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const column = yield (0, typeorm_1.findEntityOrThrow)(entities_1.ColumnType, {
        where: {
            name: req.body.status,
        },
    });
    const task = yield (0, typeorm_1.createEntity)(entities_1.Task, {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        columnType: column[0].id,
    });
    let subtasks = [];
    req.body.subtasks.forEach((subtask) => {
        subtasks.push((0, typeorm_1.createEntity)(entities_1.Subtask, {
            title: subtask.value,
            task: task.id,
            isCompleted: false,
        }));
    });
    const newSubtasks = yield Promise.all(subtasks);
    res.json({ task, newSubtasks });
}));
exports.editTaskWithSubtasks = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield (0, typeorm_1.updateEntity)(entities_1.Task, req.params.taskId, req.body);
    let subtasks = [];
    console.log(req.body);
    req.body.subtasks.forEach((subtask) => {
        subtasks.push((0, typeorm_1.createEntity)(entities_1.Subtask, {
            id: subtask.id,
            title: subtask.title,
            isCompleted: false,
            task: task.id,
        }));
    });
    res.json({ task, subtasks });
}));
exports.deleteTask = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield (0, typeorm_1.findEntityOrThrow)(entities_1.Task, {
        where: {
            title: req.params.taskTitle,
        },
    });
    yield task[0].remove();
    res.json(task[0]);
}));
//# sourceMappingURL=tasks.js.map