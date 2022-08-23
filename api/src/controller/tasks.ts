import { AppDataSource } from "../database/connection";
import { Task, Subtask, ColumnType } from "../entities";
import { catchErrors } from "../errors";
import {
  createEntity,
  findEntityOrThrow,
  updateEntity,
  validateAndSaveEntity,
} from "../utils/typeorm";

export const getTaskAndSubtasks = catchErrors(async (req, res) => {
  const task = await findEntityOrThrow(Task, {
    where: {
      title: req.params.title,
    },
    relations: ["subtasks"],
  });

  res.json(task[0]);
});

export const createTaskWithSubtasks = catchErrors(async (req, res) => {
  const listPosition = await calculateListPosition(req.body);

  const task = await createEntity(Task, { ...req.body, listPosition });
  res.json({ task });
  // const column = await findEntityOrThrow(ColumnType, {
  //   where: {
  //     name: req.body.status,
  //   },
  // });

  // console.log(column);

  // const task = await createEntity(Task, {
  //   title: req.body.title,
  //   description: req.body.description,
  //   board: column[0].id,
  //   status: !req.body.status ? "gweag" : req.body.status,
  //   listPosition: column[0].tasks.length + 1,
  // });
  // console.log(task);
  // let subtasks: any[] = [];
  // req.body.subtasks.forEach((subtask: any) => {
  //   subtasks.push(
  //     createEntity(Subtask, {
  //       title: subtask.title,
  //       task: task.id,
  //       isCompleted: false,
  //     })
  //   );
  // });
  // const newSubtasks = await Promise.all(subtasks);
  // // console.log(newColumns);
  // res.json({ task, newSubtasks });
});

export const editTaskWithSubtasks = catchErrors(async (req, res) => {
  // const board = await createEntity(Board, { name: req.body.name });
  const task = await updateEntity(Task, req.params.taskId, req.body);
  let subtasks: any[] = [];

  req.body.subtasks.forEach((subtask: any) => {
    subtasks.push(
      createEntity(Subtask, {
        id: subtask.id,
        title: subtask.title,
        isCompleted: false,
        task: task.id,
      })
    );
  });
  res.json({ task, subtasks });
  // const newColumns = await Promise.all(columns);
  // res.json({ board, newColumns });
});

export const deleteTask = catchErrors(async (req, res) => {
  const task = await findEntityOrThrow(Task, {
    where: {
      title: req.params.taskTitle,
    },
  });
  await task[0].remove();
  res.json(task[0]);
});

export const dragTask = catchErrors(async (req, res) => {
  const task = await updateEntity(Task, req.params.taskId, req.body);

  res.json(task);
});

const calculateListPosition = async ({
  boardId,
  status,
}: Task): Promise<number> => {
  const repository = AppDataSource.getRepository(Task);
  const tasks = await repository.findBy({ boardId, status });

  const listPositions = tasks.map(({ listPosition }) => listPosition);

  if (listPositions.length > 0) {
    return Math.min(...listPositions) - 1;
  }
  return 1;
};
