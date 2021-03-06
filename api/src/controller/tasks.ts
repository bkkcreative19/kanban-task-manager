import { Task, Subtask, ColumnType } from "../entities";
import { catchErrors } from "../errors";
import { createEntity, findEntityOrThrow } from "../utils/typeorm";

export const getTaskAndSubtasks = catchErrors(async (req, res) => {
  console.log(req.params);
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
