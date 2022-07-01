import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import Board from "./Board";
import Task from "./Task";

@Entity()
class ColumnType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @ManyToOne(() => Board, (board) => board.columnTypes)
  board: Board;

  @OneToMany(() => Task, (task) => task.columnType)
  tasks: Task[];
}

export default ColumnType;
