import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  RelationId,
} from "typeorm";
import Board from "./Board";
import ColumnType from "./ColumnType";
import SubTask from "./Subtask";

@Entity()
class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  title: string;

  @Column("varchar")
  description: string;

  @Column("varchar")
  status: string;

  @Column("int")
  listPosition: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @ManyToOne(() => Board, (board) => board.tasks, {
    cascade: true,
    onDelete: "CASCADE",
  })
  board: Board;

  @Column("integer")
  boardId: number;

  // @RelationId((task: Task) => task.columnType) // you need to specify target relation
  // columnTypeId: number;

  // @Column({ nullable: false })
  // columnTypeId: number;
  @OneToMany(() => SubTask, (subtask) => subtask.task, {
    eager: true,
  })
  subtasks: SubTask[];

  //   @OneToMany()
}

export default Task;
