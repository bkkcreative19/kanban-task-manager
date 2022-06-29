import React from "react";
import {
  Subtasks,
  SubtasksItem,
  SubtasksItemText,
  SubtasksTitle,
} from "./Styles";

const DetailsSubTasks = ({ subtasks }) => {
  return (
    <Subtasks>
      <SubtasksTitle>Subtasks (0 of {subtasks.length})</SubtasksTitle>
      {subtasks.map((subtask, idx) => {
        return (
          <SubtasksItem key={idx}>
            <SubtasksItemText>{subtask.title}</SubtasksItemText>
          </SubtasksItem>
        );
      })}
    </Subtasks>
  );
};

export default DetailsSubTasks;
