import React from "react";
import BoardTask from "./BoardTask";
import { List, ListHead, ListHeadCircle, ListHeadText } from "./Styles";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import randomColor from "randomcolor";
import { useState } from "react";

const BoardList = ({ column, index }) => {
  // const queryClient = useQueryClient();
  const tasks = column.tasks;
  // const mutateDeleteColumn = useMutation(deleteColumn, {
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries(["columns"]);
  //   },
  // });

  const [test, setTest] = useState(column.tasks);

  return (
    <Droppable key={index} droppableId={`${column.name}`}>
      {(provided) => (
        <List
          ref={provided.innerRef}
          style={{ background: "red" }}
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
              {column.name}
            </ListHeadText>
          </ListHead>
          {/* <div
            style={{ marginTop: "2em" }}
            // style={getListStyle(snapshot.isDraggingOver)}
          >
            {tasks.map((task, idx) => {
              return <BoardTask key={task.id} task={task} id={idx} />;
            })}
            {provided.placeholder}
          </div> */}

          {/* <Droppable key={index} droppableId={`${column.name}`}>
         {(provided, snapshot) => (
           <div
             ref={provided.innerRef}
             // style={getListStyle(snapshot.isDraggingOver)}
             {...provided.droppableProps}
             style={{
               background: "red",
               display: "flex",
               flexDirection: "column",
               padding: "grid",
               marginTop: "2em",
               // gap: "2em",
             }}
           >
             {column.tasks.map((task, idx) => {
               return <BoardTask key={task.id} task={task} id={idx} />;
             })}
             {provided.placeholder}
           </div>
         )}
       </Droppable> */}
          {/* <Droppable key={index} droppableId={`${column.name}`}>
         {(provided) => (
           <div {...provided.droppableProps} ref={provided.innerRef}>
             {column.tasks.map((task, idx) => {
               return <BoardTask key={task.id} task={task} id={idx} />;
             })}
             {provided.placeholder}
           </div>
         )}
       </Droppable> */}
        </List>
      )}
    </Droppable>
  );
};

export default BoardList;
