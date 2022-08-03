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

export const deleteColumn = catchErrors(async (req, res) => {
  const column = await deleteEntity(ColumnType, req.params.columnId);
  res.json(column);
  // console.log();
});
