import React from "react";
import BoardTask from "./BoardTask";
import { List, ListHead, ListHeadCircle, ListHeadText } from "./Styles";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import randomColor from "randomcolor";
import { useState } from "react";

const BoardList = ({ column, index, board }) => {
  // const queryClient = useQueryClient();

  // const mutateDeleteColumn = useMutation(deleteColumn, {
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries(["columns"]);
  //   },
  // });

  const filteredTasks = getSortedListTasks(board.tasks, column);

  return (
    <Droppable key={index} droppableId={`${column}`}>
      {(provided) => (
        <List
          ref={provided.innerRef}
          // style={{ background: "red" }}
          {...provided.droppableProps}
        >
          <ListHead onClick={() => console.log(provided)}>
            <ListHeadCircle index={index} color={randomColor()} />
            <ListHeadText
            // onClick={() => {
            //   mutateDeleteColumn.mutate(column.id);
            // }}
            >
              {/* {column.name} ({column.tasks.length}) */}
              {column}
            </ListHeadText>
          </ListHead>
          <div
            style={{ marginTop: "2em" }}
            // style={getListStyle(snapshot.isDraggingOver)}
          >
            {filteredTasks.map((task, idx) => {
              return <BoardTask key={task.id} task={task} id={idx} />;
            })}
            {provided.placeholder}
          </div>
        </List>
      )}
    </Droppable>
  );
};

const getSortedListTasks = (tasks, status) =>
  tasks
    .filter((task) => task.status === status)
    .sort((a, b) => a.listPosition - b.listPosition);

export default BoardList;
