import React from "react";
import BoardTask from "./BoardTask";
import { List, ListHead, ListHeadCircle, ListHeadText } from "./Styles";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import randomColor from "randomcolor";
const BoardList = ({ column, index }) => {
  return (
    <List>
      <ListHead>
        <ListHeadCircle index={index} color={randomColor()} />
        <ListHeadText>
          {column.name} ({column.tasks.length})
        </ListHeadText>
      </ListHead>

      <Droppable droppableId={String(index)} key={index}>
        {(provided, snapshot) => {
          return (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {column.tasks.map((task, idx) => {
                return <BoardTask key={idx} task={task} id={idx} />;
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </List>
  );
};

export default BoardList;
