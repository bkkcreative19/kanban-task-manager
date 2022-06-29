import React, { useState } from "react";
import {
  SubtasksItem,
  SubtasksItemCheck,
  SubtasksItemCheckIcon,
  SubtasksItemText,
} from "./Styles";
import Check from "../../../../assets/icon-check.svg";

const DetailsSubTask = ({ subtask }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  return (
    <SubtasksItem>
      <SubtasksItemCheck
        onClick={() => setIsCompleted(!isCompleted)}
        isCompleted={isCompleted}
      >
        <SubtasksItemCheckIcon src={Check} />
      </SubtasksItemCheck>
      <SubtasksItemText isCompleted={isCompleted}>
        {subtask.title}
      </SubtasksItemText>
    </SubtasksItem>
  );
};

export default DetailsSubTask;
