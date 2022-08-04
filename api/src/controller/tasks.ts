import { Task, Subtask, ColumnType } from "../entities";
import { catchErrors } from "../errors";
import {
  createEntity,
  findEntityOrThrow,
  updateEntity,
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
  const column = await findEntityOrThrow(ColumnType, {
    where: {
      name: req.body.status,
    },
  });

  const task = await createEntity(Task, {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    columnType: column[0].id,
  });
  // console.log(board);
  let subtasks: any[] = [];
  req.body.subtasks.forEach((subtask: any) => {
    subtasks.push(
      createEntity(Subtask, {
        title: subtask.value,
        task: task.id,
        isCompleted: false,
      })
    );
  });
  const newSubtasks = await Promise.all(subtasks);
  // console.log(newColumns);
  res.json({ task, newSubtasks });
});

export const editTaskWithSubtasks = catchErrors(async (req, res) => {
  // const board = await createEntity(Board, { name: req.body.name });
  const task = await updateEntity(Task, req.params.taskId, req.body);
  let subtasks: any[] = [];
  console.log(req.body);

  req.body.subtasks.forEach((subtask: any) => {
    subtasks.push(
      createEntity(Subtask, {
        id: subtask.id,
        title: subtask.name,
        isCompleted: subtask.isCompleted ? true : false,
        task: task.id,
      })
    );
  });
  res.json({ task, subtasks });
  // const newColumns = await Promise.all(columns);
  // res.json({ board, newColumns });
});

// export const deleteBoard = catchErrors(async (req, res) => {
//   const board = await deleteEntity(Board, req.params.boardId);

//   res.json(board);
// });
