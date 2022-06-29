import React, { useEffect, useState } from "react";
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
import Select from "../../shared/components/Select";
const TaskDetails = () => {
  const params = useParams();
  const { actives } = useOutletContext();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const test = async () => {
      const res = await fetch("data.json");
      const data = await res.json();

      const tasks = [];
      for (let i = 0; i < data.boards[actives[0]].columns.length; i++) {
        // console.log(data.boards[actives[0]].columns.tasks);
        tasks.push(data.boards[actives[0]].columns[i].tasks);
      }

      function flatten(tasks) {
        var ret = [];
        for (var i = 0; i < tasks.length; i++) {
          if (Array.isArray(tasks[i])) {
            ret = ret.concat(flatten(tasks[i]));
          } else {
            ret.push(tasks[i]);
          }
        }

        return ret;
      }

      const foundTask = flatten(tasks).find(
        (item) => item.title === params.taskTitle
      );

      setTask(foundTask);
    };

    test();
  }, [params.taskTitle]);
  // console.log(params);
  // const { modalClose } = useOutletContext();
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
            <OptionsLogo />
          </DetailsHead>
          <DetailsDescription>{task.description}</DetailsDescription>
          <DetailsSubTasks subtasks={task.subtasks} />
          <CurrentStatus />

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
