import React from "react";
import { Link } from "react-router-dom";
import { Task, TaskSub, TaskTitle } from "./Styles";
import { Draggable, Droppable } from "react-beautiful-dnd";

const BoardTask = ({ task, id }) => {
  function getStyle(style, snapshot) {
    // console.log(snapshot);
    if (!snapshot.isDropAnimating) {
      return style;
    }
    const { moveTo, curve, duration } = snapshot.dropAnimation;

    // move to the right spot
    const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
    // add a bit of turn for fun
    const rotate = "rotate(0.2turn)";

    // console.log(curve);

    // patching the existing style
    return {
      ...style,

      // transform: `${translate}`,
      // slowing down the drop because we can
      // transition: `transform 0.34s cubic-bezier(.1,0,.1,0), opacity 0.34s cubic-bezier(.2,1,.1,1)`,
    };
  }

  const getItemStyle = (draggableStyle, snapshot) => ({
    // some basic styles to make the items look a bit nicer
    // userSelect: "none",
    // padding: grid * 2,
    // margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    transform: snapshot.isDragging ? `rotate(10deg)` : "green",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  return (
    <Draggable key={task.id} draggableId={String(task.id)} index={id}>
      {(provided, snapshot) => {
        // console.log(snapshot);
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            // isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
            style={getItemStyle(provided.draggableProps.style, snapshot)}
          >
            <Link to={task.title}>
              <Task isBeingDragged={snapshot.isDragging}>
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
