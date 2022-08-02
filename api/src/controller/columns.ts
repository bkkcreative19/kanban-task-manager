import { Board, ColumnType, Subtask, Task } from "../entities";
import { catchErrors } from "../errors";
import {
  createEntity,
  findEntityOrThrow,
  deleteEntity,
} from "../utils/typeorm";

export const getColumns = catchErrors(async (req, res) => {
  const columns = await findEntityOrThrow(ColumnType, {
    where: {
      board: {
        id: Number(req.params.boardId),
      },
    },
    relations: ["tasks", "tasks.subtasks"],
  });

  res.json(columns);
});

export const addColumn = catchErrors(async (req, res) => {
  const board = await findEntityOrThrow(Board, {
    where: {
      id: Number(req.params.boardId),
    },
  });

  const column = await createEntity(ColumnType, {
    name: req.body.name,
    board: board[0].id,
  });

  res.json(column);
});

export const updateColumns = catchErrors(async (_req, _res) => {
  console.log("hi");
  // const board = await findEntityOrThrow(Board, {
  //   where: {
  //     id: Number(req.params.boardId),
  //   },
  //   relations: ["columnTypes"],
  // });
  // const columns = board[0].columnTypes;
  // const columnNames = columns.map((column: any) => column.name);

  // res.json(columnNames);
});

export const deleteColumn = catchErrors(async (req, _res) => {
  const tasks = await findEntityOrThrow(Task, {
    where: {
      columnType: {
        id: req.params.columnId,
      },
    },
  });
  const deleteTasks: any[] = [];
  const deleteSubTasks: any[] = [];

  tasks.forEach((task: { id: string | number }) => {
    const test = async () => {
      const subtasks = await findEntityOrThrow(Subtask, {
        where: {
          task: {
            id: task.id,
          },
        },
      });

      subtasks.forEach((subTask: { id: string | number }) => {
        deleteSubTasks.push(deleteEntity(Subtask, subTask.id));
      });
    };
    test();
    deleteTasks.push(deleteEntity(Task, task.id));
  });

  // Promise.all(deleteSubTasks);
  // Promise.all(deleteTasks);
  await deleteEntity(ColumnType, req.params.columnId);

  // console.log();
});
