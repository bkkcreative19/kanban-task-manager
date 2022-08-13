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
exports.deleteEntity = exports.updateEntity = exports.createEntity = exports.validateAndSaveEntity = exports.findEntityOrThrow = void 0;
const entities_1 = require("../entities");
const connection_1 = require("../database/connection");
const errors_1 = require("../errors");
const validation_1 = require("./validation");
const entities = {
    Board: entities_1.Board,
    Task: entities_1.Task,
    Subtask: entities_1.Subtask,
    ColumnType: entities_1.ColumnType,
};
const findEntityOrThrow = (Constructor, options) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = connection_1.AppDataSource.getRepository(Constructor);
    let instance = repository.find(options);
    if (!instance) {
        throw new errors_1.EntityNotFoundError(Constructor.name);
    }
    return instance;
});
exports.findEntityOrThrow = findEntityOrThrow;
const validateAndSaveEntity = (instance) => __awaiter(void 0, void 0, void 0, function* () {
    const Constructor = entities[instance.constructor.name];
    const repository = connection_1.AppDataSource.getRepository(Constructor);
    if ("validations" in Constructor) {
        const errorFields = (0, validation_1.generateErrors)(instance, Constructor["validations"]);
        if (Object.keys(errorFields).length > 0) {
            throw new errors_1.BadUserInputError({ fields: errorFields });
        }
    }
    return repository.save(instance);
});
exports.validateAndSaveEntity = validateAndSaveEntity;
const createEntity = (Constructor, input) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = connection_1.AppDataSource.getRepository(Constructor);
    const instance = repository.create(input);
    const result = yield (0, exports.validateAndSaveEntity)(instance);
    return result;
});
exports.createEntity = createEntity;
const updateEntity = (Constructor, id, input) => __awaiter(void 0, void 0, void 0, function* () {
    const instance = yield (0, exports.findEntityOrThrow)(Constructor, {
        where: {
            id: Number(id),
        },
    });
    Object.assign(instance[0], input);
    return (0, exports.validateAndSaveEntity)(instance[0]);
});
exports.updateEntity = updateEntity;
const deleteEntity = (Constructor, id) => __awaiter(void 0, void 0, void 0, function* () {
    const instance = yield (0, exports.findEntityOrThrow)(Constructor, {
        where: {
            id: Number(id),
        },
    });
    yield instance[0].remove();
    return instance[0];
});
exports.deleteEntity = deleteEntity;
//# sourceMappingURL=typeorm.js.map