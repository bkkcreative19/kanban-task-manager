import { Board, ColumnType } from "../entities";
import { catchErrors } from "../errors";
import { createEntity, findEntityOrThrow } from "../utils/typeorm";

export const getBoards = catchErrors(async (_req, res) => {
  const boards = await findEntityOrThrow(Board, {
    relations: [],
  });

  res.json(boards);
});

export const getBoardWithColumns = catchErrors(async (req, res) => {
  const board = await findEntityOrThrow(Board, {
    where: {
      id: Number(req.params.boardId),
    },
    relations: [
      "columnTypes",
      "columnTypes.tasks",
      "columnTypes.tasks.subtasks",
    ],
  });

  res.json(board);
});

export const createBoardWithColumns = catchErrors(async (req, _res) => {
  // const board = await createEntity(Board, { ...req.body });
  console.log(req.body.columns);
  // res.json(board);
});
