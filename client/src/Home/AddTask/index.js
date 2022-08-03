import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Modal from "../../shared/components/Modal";
import {
  TaskAdd,
  TaskAddHead,
  TaskAddInput,
  TaskAddInputField,
  TaskAddInputLabel,
  TaskAddTextArea,
  TaskAddTextAreaLabel,
  TaskAddTextAreaInput,
  TaskAddSubtaskList,
  TaskAddSubtaskHead,
  TaskAddSubtaskItem,
  TaskAddSubtaskInput,
  TaskAddSubtaskX,
  AddSubtaskBtn,
  SelectStatus,
  SelectStatusText,
  SelctStausIcon,
  SelectDropdown,
  SelectDropdownOption,
  CreateTask,
  StatusTitle,
} from "./Styles";

import Select from "../../shared/components/Select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../shared/api/tasksApi";

const AddTask = () => {
  const { boards, active } = useOutletContext();
  const [columnNames, setColumnNames] = useState([]);
  const [subtasks, setSubtasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [description, setdescription] = useState("");
  const [status, setStatus] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const yay = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/columns/${active}`
      );
      console.log(data);

      const names = data.map((item) => item.name);
      // console.log(names);
      setColumnNames(names);
      setStatus(names[0]);
    };

    yay();
  }, []);

  const addSubtask = () => {
    let test = [...subtasks];
    // console.log(test.length);
    let newSubtask = {
      type: "text",
      placeholder: "placeholder text",
      name: `text${test.length}`,
      id: test.length,
      value: "",
    };
    test.push(newSubtask);
    setSubtasks(test);
  };

  const removeSubtask = (id) => {
    // let test = [...columns];
    const newArr = [...subtasks].filter((item) => item.id !== id);
    setSubtasks(newArr);
  };

  const addTaskMutation = useMutation(createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["columns"]);
    },
  });

  const handleInputChange = (e) => {
    let subtasksTest = subtasks.slice();
    for (let i in subtasksTest) {
      if (subtasksTest[i].name == e.target.name) {
        subtasksTest[i].value = e.target.value;
        setSubtasks(subtasksTest);
        break;
      }
    }
  };

  const renderInput = (input, i) => {
    return (
      <TaskAddSubtaskItem key={input.id}>
        <TaskAddSubtaskInput
          type={input.type}
          name={input.name}
          placeholder={input.placeholder}
          // onBlur={this.saveModule}
          value={input.value}
          onChange={handleInputChange}
        />
        <TaskAddSubtaskX onClick={() => removeSubtask(input.id)}>
          X
        </TaskAddSubtaskX>
      </TaskAddSubtaskItem>
    );
  };

  // const addTask = async () => {
  //   const { data } = await axios.post("http://localhost:5000/tasks", {
  //     title: taskName,
  //     description,
  //     subtasks,
  //     status,
  //   });
  //   console.log(data);
  //   navigate("/");
  // };

  return (
    <Modal
      isOpen={true}
      width={480}
      withCloseIcon={false}
      onClose={() => navigate("/")}
    >
      <TaskAdd>
        <TaskAddHead>Add New Task</TaskAddHead>
        <TaskAddInput>
          <TaskAddInputLabel>Title</TaskAddInputLabel>
          <TaskAddInputField onChange={(e) => setTaskName(e.target.value)} />
        </TaskAddInput>
        <TaskAddTextArea>
          <TaskAddTextAreaLabel>Description</TaskAddTextAreaLabel>
          <TaskAddTextAreaInput
            onChange={(e) => setdescription(e.target.value)}
          />
        </TaskAddTextArea>
        <TaskAddSubtaskList>
          <TaskAddSubtaskHead>Subtasks</TaskAddSubtaskHead>
          {subtasks.map(renderInput)}
        </TaskAddSubtaskList>
        <AddSubtaskBtn onClick={addSubtask}>+ Add new Subtask</AddSubtaskBtn>
        <StatusTitle>Status</StatusTitle>
        {columnNames && (
          <Select
            setSelected={setStatus}
            selected={status}
            options={columnNames}
          />
        )}

        {/* <SelectStatus>
          <SelectStatusText>Todo</SelectStatusText>
          <SelctStausIcon src={ChevronDown} />
          <SelectDropdown>{columnNames.map((columns, idx) => {
            return <SelectDropdownOption
          })}</SelectDropdown>
        </SelectStatus> */}
        <CreateTask
          onClick={() => {
            addTaskMutation.mutate({
              title: taskName,
              description,
              subtasks,
              status,
            });
            navigate("/");
          }}
        >
          Create New Task
        </CreateTask>
      </TaskAdd>
    </Modal>
  );
};

export default AddTask;
