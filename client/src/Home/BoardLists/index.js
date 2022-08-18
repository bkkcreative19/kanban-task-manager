import React from "react";

import BoardList from "./BoardList";
import { Lists } from "./Styles";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddColumn from "./AddColumn";
import { useGetColumnsQuery } from "../../shared/services/columns/columnsSlice";
import NoColumns from "./NoColumns";

const BoardLists = ({ active }) => {
  const { data: columns } = useGetColumnsQuery(active);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    console.log(source.index);

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];

      const sourceItems = [...sourceColumn.tasks];
      const destItems = [...destColumn.tasks];

      const [removed] = sourceItems.splice(source.index, 1);

      if (destItems.length > 0) {
        destItems.splice(destination.index, 0, removed);
      } else {
        destItems.push(removed);
      }
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.tasks];

      console.log(copiedItems);
      const [removed] = copiedItems.splice(source.index, 1);

      copiedItems.splice(destination.index, 0, removed);

      console.log(copiedItems);
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
      {columns && columns.length > 0 ? (
        <Lists>
          <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            {columns &&
              columns.map((column, idx) => {
                return <BoardList key={idx} column={column} index={idx} />;
              })}
          </DragDropContext>
          <AddColumn boardId={active} />
        </Lists>
      ) : (
        // <AddColumn boardId={active} />
        <NoColumns boardId={active} />
      )}
    </>
  );
};

export default BoardLists;
