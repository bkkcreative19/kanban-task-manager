import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import ColumnType from "./ColumnType";
import Task from "./Task";

@Entity()
class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @OneToMany(() => ColumnType, (columnType) => columnType.board, {
    eager: true,
  })
  @OneToMany(() => Task, (task) => task.board, {
    eager: true,
  })
  tasks: Task[];
  columnTypes: ColumnType[];
}

export default Board;
