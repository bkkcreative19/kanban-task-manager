import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
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
import Select from "../../shared/components/Select";
const TaskDetails = () => {
  const params = useParams();
  const { actives } = useOutletContext();
  const [task, setTask] = useState(null);
  const [currentStatus, setCurrentStatus] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const test = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/tasks/${params.taskTitle}`
      );

      setTask(data);
      setCurrentStatus(data.status);
    };

    test();
  }, [params.taskTitle]);
  return (
    <Modal
      isOpen={true}
      width={480}
      withCloseIcon={false}
      onClose={() => navigate("/home")}
    >
      {task && (
        <Details>
          <DetailsHead>
            <DetailsHeadText>{task.title}</DetailsHeadText>
            <OptionsLogo />
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

    // <Modal
    //   isOpen={undefined}
    //   width={480}
    //   withCloseIcon={false}
    //   onClose={() => navigate("/")}
    //   Content={(modal) => (
    // <Details>
    //   {params.taskTitle}
    //   hi
    //   <h1 onClick={() => modal.close()}>hi</h1>
    // </Details>
    //   )}
    // />
  );
};

export default TaskDetails;
