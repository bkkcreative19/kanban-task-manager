import React, { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";

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

import { getTask } from "../../shared/api/tasksApi";
import { useGetTaskQuery } from "../../shared/features/task/tasksSlice";
const TaskDetails = () => {
  const params = useParams();

  const [currentStatus, setCurrentStatus] = useState();

  const { data: task } = useGetTaskQuery(params.taskTitle);
  console.log(task);
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
          <CurrentStatus
            currentStatus={currentStatus}
            setCurrentStatus={setCurrentStatus}
          />

          {/* <button onClick={closeModal}>click</button> */}
        </Details>
      )}
    </Modal>
  );
};

export default TaskDetails;
