import React from "react";
import BoardTask from "./BoardTask";
import { List, ListHead, ListHeadCircle, ListHeadText } from "./Styles";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import randomColor from "randomcolor";

const BoardList = ({ column, index }) => {
  // const queryClient = useQueryClient();

  // const mutateDeleteColumn = useMutation(deleteColumn, {
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries(["columns"]);
  //   },
  // });
  return (
    <List>
      <ListHead>
        <ListHeadCircle index={index} color={randomColor()} />
        <ListHeadText
        // onClick={() => {
        //   mutateDeleteColumn.mutate(column.id);
        // }}
        >
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
