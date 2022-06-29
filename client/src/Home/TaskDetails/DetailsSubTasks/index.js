import React, { useState } from "react";
import {
  Subtasks,
  SubtasksItem,
  SubtasksItemCheck,
  SubtasksItemCheckIcon,
  SubtasksItemText,
  SubtasksTitle,
} from "./Styles";

import DetailsSubTask from "./DetailsSubTask";

const DetailsSubTasks = ({ subtasks }) => {
  return (
    <Subtasks>
      <SubtasksTitle>Subtasks (0 of {subtasks.length})</SubtasksTitle>
      {subtasks.map((subtask, idx) => {
        return <DetailsSubTask key={idx} subtask={subtask} />;
      })}
    </Subtasks>
  );
};

export default DetailsSubTasks;
