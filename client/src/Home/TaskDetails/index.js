import React from "react";
import { useParams } from "react-router-dom";

const TaskDetails = ({}) => {
  const params = useParams();
  console.log();
  return (
    <div>
      {params.taskTitle}
      <h1>hi</h1>
    </div>
  );
};

export default TaskDetails;
