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
exports.deleteBoard = exports.editBoardWithColumns = exports.createBoardWithColumns = exports.getBoardWithColumns = exports.getBoards = void 0;
const entities_1 = require("../entities");
const errors_1 = require("../errors");
const typeorm_1 = require("../utils/typeorm");
exports.getBoards = (0, errors_1.catchErrors)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const boards = yield (0, typeorm_1.findEntityOrThrow)(entities_1.Board, {
        relations: [],
    });
    res.json(boards);
}));
exports.getBoardWithColumns = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const board = yield (0, typeorm_1.findEntityOrThrow)(entities_1.Board, {
        where: {
            id: Number(req.params.boardId),
        },
        relations: [
            "columnTypes",
            "columnTypes.tasks",
            "columnTypes.tasks.subtasks",
        ],
    });
    res.json(board);
}));
exports.createBoardWithColumns = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const board = yield (0, typeorm_1.createEntity)(entities_1.Board, { name: req.body.name });
    let columns = [];
    req.body.columns.forEach((column) => {
        columns.push((0, typeorm_1.createEntity)(entities_1.ColumnType, {
            name: column.value,
            board: board.id,
        }));
    });
    const newColumns = yield Promise.all(columns);
    res.json({ board, newColumns });
}));
exports.editBoardWithColumns = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const board = yield (0, typeorm_1.updateEntity)(entities_1.Board, req.params.boardId, req.body);
    let columns = [];
    console.log("tt", req.body);
    req.body.columns.forEach((column) => {
        columns.push((0, typeorm_1.createEntity)(entities_1.ColumnType, {
            id: column.id,
            name: column.name,
            board: board.id,
        }));
    });
    res.json({ board, columns });
}));
exports.deleteBoard = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const board = yield (0, typeorm_1.deleteEntity)(entities_1.Board, req.params.boardId);
    res.json(board);
}));
//# sourceMappingURL=boards.js.map