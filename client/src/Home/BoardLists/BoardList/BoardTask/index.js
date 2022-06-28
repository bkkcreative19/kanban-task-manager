import React from "react";
import { Link } from "react-router-dom";
import { Task, TaskSub, TaskTitle } from "./Styles";

const BoardTask = ({ task, id }) => {
  return (
    <Link to={task.title}>
      <Task>
        <TaskTitle>{task.title}</TaskTitle>
        <TaskSub>0 of {task.subtasks.length} substasks</TaskSub>
      </Task>
    </Link>
  );
};

export default BoardTask;
