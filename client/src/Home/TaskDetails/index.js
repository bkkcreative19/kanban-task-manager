import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Modal from "../../shared/components/Modal";
import {
  Details,
  DetailsDescription,
  DetailsHead,
  DetailsHeadText,
} from "./Styles";
import OptionsLogo from "../../shared/components/OptionsLogo";
import DetailsSubTasks from "./DetailsSubTasks";
import CurrentStatus from "./CurrentStatus";

import { useGetTaskQuery } from "../../shared/services/task/tasksSlice";
const TaskDetails = () => {
  const params = useParams();

  const { data: task } = useGetTaskQuery(params.taskTitle);

  const navigate = useNavigate();

  return (
    <Modal
      isOpen={true}
      width={480}
      withCloseIcon={false}
      onClose={() => navigate("/")}
    >
      {task && (
        <Details>
          <DetailsHead>
            <DetailsHeadText>{task.title}</DetailsHeadText>
            <OptionsLogo
              type={"Task"}
              editRoute={`/editTask/${params.taskTitle}`}
              deleteRoute={`/deleteTask/${params.taskTitle}`}
            />
          </DetailsHead>
          <DetailsDescription>{task.description}</DetailsDescription>
          <DetailsSubTasks subtasks={task.subtasks} />
          <CurrentStatus currentStatus={task.status} />
        </Details>
      )}
    </Modal>
  );
};

export default TaskDetails;
