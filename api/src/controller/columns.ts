import { Board, ColumnType } from "../entities";
import { catchErrors } from "../errors";
import { createEntity, findEntityOrThrow } from "../utils/typeorm";

export const getColumns = catchErrors(async (req, res) => {
  console.log(typeof req.params.boardId);
  const board = await findEntityOrThrow(Board, {
    where: {
      id: Number(req.params.boardId),
    },
    relations: ["columnTypes"],
  });
  const columns = board[0].columnTypes;
  const columnNames = columns.map((column: any) => column.name);

  res.json(columnNames);
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
