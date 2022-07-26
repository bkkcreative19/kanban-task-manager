import React from "react";
import BoardTask from "./BoardTask";
import { List, ListHead, ListHeadCircle, ListHeadText } from "./Styles";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useState } from "react";

const BoardList = ({ column, index }) => {
  const [test, setTest] = useState(column);
  console.log(test);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const copiedItems = [...test.tasks];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setTest({
      ...test,
      tasks: copiedItems,
    });
  };

  return (
    <List>
      <ListHead>
        <ListHeadCircle index={index} />
        <ListHeadText>
          {column.name} ({column.tasks.length})
        </ListHeadText>
      </ListHead>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <Droppable droppableId={String(index)} key={index}>
          {(provided, snapshot) => {
            return (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {test.tasks.map((task, idx) => {
                  return <BoardTask key={idx} task={task} id={idx} />;
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </List>
  );
};

export default BoardList;
