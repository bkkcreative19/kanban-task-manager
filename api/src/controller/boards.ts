import { Board, ColumnType } from "../entities";
import { catchErrors } from "../errors";
import {
  createEntity,
  deleteEntity,
  findEntityOrThrow,
  updateEntity,
} from "../utils/typeorm";
import { createMultipleColumns } from "./columns";

export const getBoards = catchErrors(async (_req, res) => {
  const boards = await findEntityOrThrow(Board, {});

  res.json(boards);
});

export const getBoardWithColumns = catchErrors(async (req, res) => {
  const board = await findEntityOrThrow(Board, {
    where: {
      id: Number(req.params.boardId),
    },
    relations: ["tasks"],
  });

  res.json(board[0]);
});

export const createBoardWithColumns = catchErrors(async (req, res) => {
  const board = await createEntity(Board, { name: req.body.name });
  const columns = createMultipleColumns(req.body.columns, board.id);
  res.json({ board });
});

export const editBoardWithColumns = catchErrors(async (req, res) => {
  // const board = await createEntity(Board, { name: req.body.name });
  const board = await updateEntity(Board, req.params.boardId, req.body);
  let columns: any[] = [];
  console.log("tt", req.body);

  req.body.columns.forEach((column: any) => {
    columns.push(
      createEntity(ColumnType, {
        id: column.id,
        name: column.name,
        board: board.id,
      })
    );
  });
  res.json({ board, columns });
  // const newColumns = await Promise.all(columns);
  // res.json({ board, newColumns });
});

export const deleteBoard = catchErrors(async (req, res) => {
  const board = await deleteEntity(Board, req.params.boardId);

  res.json(board);
});
