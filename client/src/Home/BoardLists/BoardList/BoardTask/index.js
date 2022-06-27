import React from "react";
import { Task, TaskSub, TaskTitle } from "./Styles";

const BoardTask = ({ task }) => {
  return (
    <Task>
      <TaskTitle>{task.title}</TaskTitle>
      <TaskSub>0 of {task.subtasks.length} substasks</TaskSub>
    </Task>
  );
};

export default BoardTask;
