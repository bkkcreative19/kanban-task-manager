import React, { useState } from "react";

import BoardList from "./BoardList";
import { Lists } from "./Styles";

import { DragDropContext } from "react-beautiful-dnd";
import AddColumn from "./AddColumn";
import { useGetColumnsQuery } from "../../shared/services/columns/columnsSlice";
import useApi from "../../shared/hooks/api";
import api from "../../shared/utils/api";
import NoColumns from "./NoColumns";
import { useUpdateDragTaskMutation } from "../../shared/services/task/tasksSlice";
import { useEffect } from "react";
import {
  moveItemWithinArray,
  insertItemIntoArray,
  updateArrayItemById,
} from "../../shared/utils/javascript";

const BoardLists = ({ active }) => {
  const { data: columns } = useGetColumnsQuery(active);
  const [updateDragTask, { isLoading }] = useUpdateDragTaskMutation();
  // const [{ data: columns, error, setLocalData }, fetchColumns] = useApi.get(
  //   `/columns/${active}`
  // );

  const [testt, setTestt] = useState([]);
  // console.log(columns);
  // const [updateDragTask] = useUpdateDragTaskMutation();

  // const updateLocalTasks = (taskId, updatedFields) => {
  //   setLocalData((currentData) => ({
  //     columns: {
  //       ...currentData.columns,
  //       tasks: updateArrayItemById(
  //         currentData.columns.tasks,
  //         taskId,
  //         updatedFields
  //       ),
  //     },
  //   }));
  // };

  const handleDrop = ({ draggableId, destination, source }) => {
    const allTasks = columns.map((column) => column.tasks).flat();

    const destColumn = columns.find(
      (column) => column.name === destination.droppableId
    );

    const task = allTasks.find((task) => task.id === Number(draggableId));

    console.log(task);
  };

  return (
    <>
      {columns && columns.length > 0 ? (
        <DragDropContext onDragEnd={handleDrop}>
          <Lists>
            {columns.map((column, idx) => {
              return <BoardList key={idx} column={column} index={idx} />;
            })}

            <AddColumn boardId={active} />
          </Lists>
        </DragDropContext>
      ) : (
        // <AddColumn boardId={active} />
        <NoColumns boardId={active} />
      )}
    </>
  );
};

export default BoardLists;
