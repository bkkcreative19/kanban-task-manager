import React from "react";
import { Link } from "react-router-dom";
import { Task, TaskSub, TaskTitle } from "./Styles";
import { Draggable, Droppable } from "react-beautiful-dnd";

const BoardTask = ({ task, id }) => {
  return (
    <Draggable index={id} key={task.id} draggableId={String(task.id)}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Link to={task.title}>
              <Task>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskSub>0 of {task.subtasks.length} substasks</TaskSub>
              </Task>
            </Link>
          </div>
        );
      }}
    </Draggable>
  );
};

export default BoardTask;
