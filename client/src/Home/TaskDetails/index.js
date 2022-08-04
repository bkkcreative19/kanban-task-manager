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

import { useQuery } from "@tanstack/react-query";
import { getTask } from "../../shared/api/tasksApi";
const TaskDetails = () => {
  const params = useParams();

  const [currentStatus, setCurrentStatus] = useState();

  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: task,
  } = useQuery(["task", params.taskTitle], () => getTask(params.taskTitle));

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
            <OptionsLogo route={`editTask/${params.taskTitle}`} />
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
