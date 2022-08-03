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

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @ManyToOne(() => ColumnType, (columnType) => columnType.tasks, {
    cascade: true,
    onDelete: "CASCADE",
  })
  columnType: ColumnType;

  @OneToMany(() => SubTask, (subtask) => subtask.task, {
    eager: true,
  })
  subtasks: SubTask[];

  //   @OneToMany()
}

export default Task;
