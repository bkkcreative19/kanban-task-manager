"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Board_1 = __importDefault(require("./Board"));
const Task_1 = __importDefault(require("./Task"));
let ColumnType = class ColumnType extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ColumnType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], ColumnType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], ColumnType.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], ColumnType.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Board_1.default, (board) => board.columnTypes, {
        cascade: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Board_1.default)
], ColumnType.prototype, "board", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Task_1.default, (task) => task.columnType, {
        eager: true,
    }),
    __metadata("design:type", Array)
], ColumnType.prototype, "tasks", void 0);
ColumnType = __decorate([
    (0, typeorm_1.Entity)()
], ColumnType);
exports.default = ColumnType;
//# sourceMappingURL=ColumnType.js.map