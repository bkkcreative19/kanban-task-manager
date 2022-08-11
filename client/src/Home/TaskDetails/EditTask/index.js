import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Modal from "../../../shared/components/Modal";
import {
  TaskEdit,
  TaskEditHead,
  TaskEditInput,
  TaskEditInputField,
  TaskEditInputLabel,
  TaskEditTextArea,
  TaskEditTextAreaLabel,
  TaskEditTextAreaInput,
  TaskEditSubtaskList,
  TaskEditSubtaskHead,
  TaskEditSubtaskItem,
  TaskEditSubtaskInput,
  TaskEditSubtaskX,
  AddSubtaskBtn,
  CreateTask,
  StatusTitle,
} from "./Styles";

import Select from "../../../shared/components/Select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editTask, getTask } from "../../../shared/api/tasksApi";
import { deleteSubtask } from "../../../shared/api/subtasksApi";
import {
  useGetTaskQuery,
  useUpdateTaskMutation,
} from "../../../shared/features/task/tasksSlice";
import { useSelector } from "react-redux";
import { selectBoardById } from "../../../shared/features/board/boardSlice";
import { useDeleteSubtaskMutation } from "../../../shared/features/subtask/subtasksSlice";
// import { createTask } from "../../shared/api/tasksApi";

const EditTask = () => {
  const { boards } = useOutletContext();
  // const [columnNames, setColumnNames] = useState([]);
  // const [columns, setColumns] = useState([]);
  const [subtasks, setSubtasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [columnId, setColumnId] = useState();
  const params = useParams();
  const [description, setdescription] = useState("");
  const [status, setStatus] = useState();
  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  const [deleteSubtask] = useDeleteSubtaskMutation();
  // const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { active } = useSelector((state) => state.activeBoard);
  const { data: task } = useGetTaskQuery(params.taskTitle);

  const board = useSelector((state) =>
    selectBoardById(
      state,
      active === 0 ? Number(localStorage.getItem("active")) : active
    )
  );

  // console.log(board.columnTypes);
  const columns = board && board.columnTypes;
  const columnNames = board && board.columnTypes.map((column) => column.name);
  //   console.log(params);

  useEffect(() => {
    const yay = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/columns/${active}`
      );
      console.log(data);
      const names = data.map((item) => item.name);
      const ids = data.map((item) => item.id);
      // console.log(names);
      // setColumnNames(names);
      // setColumns(data);
      //   setStatus({ name: names[0], id: ids[0] });
    };

    // yay();
  }, []);

  //   console.log(columnIds);

  // const {
  //   isLoading,
  //   isError,
  //   data: task,
  // } = useQuery(["task", params.taskTitle], () => getTask(params.taskTitle));

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

  useEffect(() => {
    if (task) {
      setStatus(task.status);
      setSubtasks(task.subtasks);
    }
  }, [task]);

  const removeSubtask = (id) => {
    // let test = [...columns];
    const newArr = [...subtasks].filter((item) => item.id !== id);
    setSubtasks(newArr);
  };

  // const editTaskMutation = useMutation(editTask, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["columns"]);
  //   },
  // });
  // const deleteSubtaskMutation = useMutation(deleteSubtask, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["task"]);
  //   },
  // });

  const handleInputChange = (e) => {
    let subtasksTest = subtasks.slice();

    for (let i in subtasksTest) {
      if (subtasksTest[i].title == e.target.name) {
        subtasksTest[i].title = e.target.value;
        setSubtasks(subtasksTest);
        break;
      }
    }
  };

  const renderInput = (input, i) => {
    return (
      <TaskEditSubtaskItem key={i}>
        <TaskEditSubtaskInput
          type={input.type}
          name={input.title}
          placeholder={input.placeholder}
          // onBlur={this.saveModule}
          value={input.title}
          onChange={handleInputChange}
        />
        <TaskEditSubtaskX
          onClick={() => {
            deleteSubtask(input.id);
            removeSubtask(input.id);
          }}
        >
          X
        </TaskEditSubtaskX>
      </TaskEditSubtaskItem>
    );
  };

  const handleSetSelected = (e) => {
    const test = columns.find((item) => item.name === e);
    setStatus((prevState) => {
      return { ...prevState, name: e, id: test.id };
    });
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
      {task && (
        <TaskEdit>
          <TaskEditHead>Edit Task</TaskEditHead>
          <TaskEditInput>
            <TaskEditInputLabel>Title</TaskEditInputLabel>
            <TaskEditInputField
              value={!taskName ? task.title : taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </TaskEditInput>
          <TaskEditTextArea>
            <TaskEditTextAreaLabel>Description</TaskEditTextAreaLabel>
            <TaskEditTextAreaInput
              onChange={(e) => setdescription(e.target.value)}
            />
          </TaskEditTextArea>
          <TaskEditSubtaskList>
            <TaskEditSubtaskHead>Subtasks</TaskEditSubtaskHead>
            {subtasks.length > 0
              ? subtasks.map(renderInput)
              : task.subtasks.map(renderInput)}
          </TaskEditSubtaskList>
          <AddSubtaskBtn onClick={addSubtask}>+ Add new Subtask</AddSubtaskBtn>
          <StatusTitle>Status</StatusTitle>
          {columnNames && (
            <Select
              setSelected={handleSetSelected}
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
              // editTaskMutation.mutate({
              // title: taskName ? taskName : task.title,
              // description,
              // taskId: task.id,
              // subtasks,
              // status: !status ? task.status : status.name,
              // columnType: !status ? task.columnType : status.id,
              // });
              updateTask({
                title: taskName ? taskName : task.title,
                description,
                taskId: task.id,
                subtasks,
                status: !status ? task.status : status.name,
                columnType: !status ? task.columnType : status.id,
              });
              navigate(`/`);
            }}
          >
            Save Changes
          </CreateTask>
        </TaskEdit>
      )}
    </Modal>
  );
};

export default EditTask;
