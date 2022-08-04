import { Subtask } from "../entities";
import { catchErrors } from "../errors";
import { deleteEntity } from "../utils/typeorm";

export const deleteSubtask = catchErrors(async (req, res) => {
  const subtask = await deleteEntity(Subtask, req.params.subtaskId);
  res.json(subtask);
  // console.log();
});
