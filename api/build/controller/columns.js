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
exports.deleteColumn = exports.updateColumns = exports.addColumn = exports.getColumns = void 0;
const entities_1 = require("../entities");
const errors_1 = require("../errors");
const typeorm_1 = require("../utils/typeorm");
exports.getColumns = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const columns = yield (0, typeorm_1.findEntityOrThrow)(entities_1.ColumnType, {
        where: {
            board: {
                id: Number(req.params.boardId),
            },
        },
        relations: ["tasks", "tasks.subtasks"],
    });
    res.json(columns);
}));
exports.addColumn = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const board = yield (0, typeorm_1.findEntityOrThrow)(entities_1.Board, {
        where: {
            id: Number(req.params.boardId),
        },
    });
    const column = yield (0, typeorm_1.createEntity)(entities_1.ColumnType, {
        name: req.body.name,
        board: board[0].id,
    });
    res.json(column);
}));
exports.updateColumns = (0, errors_1.catchErrors)((_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hi");
}));
exports.deleteColumn = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const column = yield (0, typeorm_1.deleteEntity)(entities_1.ColumnType, req.params.columnId);
    res.json(column);
}));
//# sourceMappingURL=columns.js.map