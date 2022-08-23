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

const BoardLists = ({ active, board, setLocalData }) => {
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
  const updateLocalProjectTasks = (taskId, updatedFields) => {
    console.log(setLocalData);
    // setLocalData((currentData) => ({
    //   board: {
    //     ...currentData.board,
    //     tasks: updateArrayItemById(
    //       currentData.board.tasks,
    //       taskId,
    //       updatedFields
    //     ),
    //   },
    setLocalData((currentData) => ({
      ...currentData,
      tasks: updateArrayItemById(currentData.tasks, taskId, updatedFields),
    }));
  };

  const handleDrop = ({ draggableId, destination, source }) => {
    // console.log(destination);
    // console.log(source);

    const taskId = Number(draggableId);

    // console.log(
    //   calculateIssueListPosition(board.tasks, destination, source, taskId)
    // );

    api.optimisticUpdate(`/drag-task/${taskId}`, {
      updatedFields: {
        listPosition: calculateIssueListPosition(
          board.tasks,
          destination,
          source,
          taskId
        ),
        status: destination.droppableId,
      },
      currentFields: board.tasks.find(({ id }) => id === taskId),
      setLocalData: (fields) => updateLocalProjectTasks(taskId, fields),
    });

    // updateDragTask({
    //   taskId,
    //   status: destination.droppableId,
    //   listPosition: calculateIssueListPosition(
    //     board.tasks,
    //     destination,
    //     source,
    //     taskId
    //   ),
    // });
  };

  return (
    <>
      {columns && columns.length > 0 ? (
        <DragDropContext onDragEnd={handleDrop}>
          <Lists>
            {columns.map((column, idx) => {
              return (
                <BoardList
                  key={idx}
                  board={board}
                  column={column}
                  index={idx}
                />
              );
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

const isPositionChanged = (destination, source) => {
  if (!destination) return false;
  const isSameList = destination.droppableId === source.droppableId;
  const isSamePosition = destination.index === source.index;
  return !isSameList || !isSamePosition;
};

const calculateIssueListPosition = (...args) => {
  // console.log(args);
  const { prevIssue, nextIssue } = getAfterDropPrevNextIssue(...args);
  let position;

  if (!prevIssue && !nextIssue) {
    position = 1;
  } else if (!prevIssue) {
    position = nextIssue.listPosition - 1;
  } else if (!nextIssue) {
    position = prevIssue.listPosition + 1;
  } else {
    position =
      prevIssue.listPosition +
      (nextIssue.listPosition - prevIssue.listPosition) / 2;
  }

  // console.log(position);
  return position;
};

const getAfterDropPrevNextIssue = (
  allIssues,
  destination,
  source,
  droppedIssueId
) => {
  const beforeDropDestinationIssues = getSortedListIssues(
    allIssues,
    destination.droppableId
  );
  const droppedIssue = allIssues.find((issue) => issue.id === droppedIssueId);

  const isSameList = destination.droppableId === source.droppableId;

  const afterDropDestinationIssues = isSameList
    ? moveItemWithinArray(
        beforeDropDestinationIssues,
        droppedIssue,
        destination.index
      )
    : insertItemIntoArray(
        beforeDropDestinationIssues,
        droppedIssue,
        destination.index
      );

  return {
    prevIssue: afterDropDestinationIssues[destination.index - 1],
    nextIssue: afterDropDestinationIssues[destination.index + 1],
  };
};

const getSortedListIssues = (issues, status) =>
  issues
    .filter((issue) => issue.status === status)
    .sort((a, b) => a.listPosition - b.listPosition);

export default BoardLists;
