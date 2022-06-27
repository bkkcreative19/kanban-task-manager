import React from "react";
import BoardTask from "./BoardTask";
import { List, ListHead, ListHeadCircle, ListHeadText } from "./Styles";

const BoardList = ({ column, index }) => {
  return (
    <List>
      <ListHead>
        <ListHeadCircle index={index} />
        <ListHeadText>
          {column.name} ({column.tasks.length})
        </ListHeadText>
      </ListHead>
      {column.tasks.map((task, idx) => {
        return <BoardTask key={idx} task={task} />;
      })}
    </List>
  );
};

export default BoardList;
