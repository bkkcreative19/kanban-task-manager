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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../entities");
const typeorm_1 = require("../utils/typeorm");
const fs_1 = __importDefault(require("fs"));
const rawData = fs_1.default.readFileSync("data.json").toString();
const data = JSON.parse(rawData);
const seedBoards = () => {
    const boards = [
        (0, typeorm_1.createEntity)(entities_1.Board, {
            name: "Platform Launch",
        }),
        (0, typeorm_1.createEntity)(entities_1.Board, {
            name: "Marketing Plan",
        }),
        (0, typeorm_1.createEntity)(entities_1.Board, {
            name: "Roadmap",
        }),
    ];
    return Promise.all(boards);
};
const seedColumns = (boards) => {
    const columns = [
        (0, typeorm_1.createEntity)(entities_1.ColumnType, {
            name: "Todo",
            board: boards[0].id,
        }),
        (0, typeorm_1.createEntity)(entities_1.ColumnType, {
            name: "Doing",
            board: boards[0].id,
        }),
        (0, typeorm_1.createEntity)(entities_1.ColumnType, {
            name: "Done",
            board: boards[0].id,
        }),
        (0, typeorm_1.createEntity)(entities_1.ColumnType, {
            name: "Todo",
            board: boards[1].id,
        }),
        (0, typeorm_1.createEntity)(entities_1.ColumnType, {
            name: "Doing",
            board: boards[1].id,
        }),
        (0, typeorm_1.createEntity)(entities_1.ColumnType, {
            name: "Done",
            board: boards[1].id,
        }),
        (0, typeorm_1.createEntity)(entities_1.ColumnType, {
            name: "Now",
            board: boards[2].id,
        }),
        (0, typeorm_1.createEntity)(entities_1.ColumnType, {
            name: "Next",
            board: boards[2].id,
        }),
        (0, typeorm_1.createEntity)(entities_1.ColumnType, {
            name: "Later",
            board: boards[2].id,
        }),
    ];
    return Promise.all(columns);
};
const seedTasks = (columns) => {
    const tasksForDB = [];
    let tasks = [];
    for (let i = 0; i < data.boards.length; i++) {
        data.boards[i].columns.forEach((item) => {
            tasks.push(item.tasks);
        });
    }
    function flatten(items) {
        var ret = [];
        for (var i = 0; i < items.length; i++) {
            if (Array.isArray(items[i])) {
                ret = ret.concat(flatten(items[i]));
            }
            else {
                ret.push(items[i]);
            }
        }
        return ret;
    }
    function determineColumnId(idx) {
        if (idx < 4) {
            return columns[0].id;
        }
        else if (idx < 10 && idx > 3) {
            return columns[1].id;
        }
        else if (idx < 17 && idx > 9) {
            return columns[2].id;
        }
        else if (idx < 20 && idx > 16) {
            return columns[3].id;
        }
        else if (idx < 22 && idx > 19) {
            return columns[6].id;
        }
    }
    flatten(tasks).forEach((item, idx) => {
        console.log(item);
        tasksForDB.push((0, typeorm_1.createEntity)(entities_1.Task, {
            title: item.title,
            description: item.description,
            status: item.status,
            columnType: determineColumnId(idx),
        }));
    });
    return tasksForDB;
};
const seedSubtasks = (_tasks) => {
    let tasks = [];
    let subtasksForDB = [];
    for (let i = 0; i < data.boards.length; i++) {
        data.boards[i].columns.forEach((item) => {
            tasks.push(item.tasks);
        });
    }
    function flatten(items) {
        var ret = [];
        for (var i = 0; i < items.length; i++) {
            if (Array.isArray(items[i])) {
                ret = ret.concat(flatten(items[i]));
            }
            else {
                ret.push(items[i]);
            }
        }
        return ret;
    }
    flatten(tasks).forEach((item, idx) => {
        item.subtasks.forEach((item) => {
            subtasksForDB.push((0, typeorm_1.createEntity)(entities_1.Subtask, {
                title: item.title,
                isCompleted: item.isCompleted,
                task: idx + 1,
            }));
        });
    });
    return Promise.all(subtasksForDB);
};
const insertData = () => __awaiter(void 0, void 0, void 0, function* () {
    const boards = yield seedBoards();
    const columns = yield seedColumns(boards);
    const tasks = yield seedTasks(columns);
    const subtasks = yield seedSubtasks([]);
});
exports.default = insertData;
//# sourceMappingURL=seed.js.map