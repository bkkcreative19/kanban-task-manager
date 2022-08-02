import React, { useEffect, useState } from "react";

import BoardList from "./BoardList";
import { Lists } from "./Styles";
import { getBoardWithColumns } from "../../shared/api/boardsApi";
import { getColumns } from "../../shared/api/columnsApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddColumn from "./AddColumn";

const BoardLists = ({ active }) => {
  const queryClient = useQueryClient();

  // const {
  //   isLoading,
  //   isError,
  //   data: board,
  // } = useQuery(["board", active], () => getBoardWithColumns(active));
  const {
    isLoading,
    isError,
    data: columns,
  } = useQuery(["columns", active], () => getColumns(active));

  console.log(columns);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];

      const sourceItems = sourceColumn.tasks;
      const destItems = destColumn.tasks;

      const [removed] = sourceItems.splice(source.index, 1);

      if (destItems.length > 0) {
        destItems.splice(destination.index, 0, removed);
      } else {
        destItems.push(removed);
      }
    } else {
      const column = columns[source.droppableId];
      const copiedItems = column.tasks;
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
    }

    // console.log(result);
    // const copiedItems = [...test.tasks];
    // const [removed] = copiedItems.splice(source.index, 1);
    // copiedItems.splice(destination.index, 0, removed);
    // setTest({
    //   ...test,
    //   tasks: copiedItems,
    // });
  };

  return (
    <>
      <Lists>
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          {columns &&
            columns.map((column, idx) => {
              return <BoardList key={idx} column={column} index={idx} />;
            })}
        </DragDropContext>
        <AddColumn boardId={active} />
      </Lists>
    </>
  );
};

export default BoardLists;
