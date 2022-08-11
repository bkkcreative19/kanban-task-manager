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
import { Field, FieldArray, Form, Formik } from "formik";
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

  const board = useSelector((state) => selectBoardById(state, active));

  // console.log(board.columnTypes);
  const columns = board && board.columnTypes;
  const columnNames = board && board.columnTypes.map((column) => column.name);

  useEffect(() => {
    if (task) {
      setStatus(task.status);
    }
  }, [task]);

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
            <Formik
              initialValues={{ subtasks: task.subtasks }}
              onSubmit={(values) => {
                // if (!boardName) {
                //   navigate("/");
                //   return;
                // }
                // console.log(values.subtasks);
                updateTask({
                  title: taskName ? taskName : task.title,
                  description,
                  taskId: task.id,
                  subtasks: values.subtasks,
                  status: !status ? task.status : status.name,
                  columnType: !status ? task.columnType : status.id,
                });
                navigate("/");
              }}
            >
              <Form>
                <div className="form-control">
                  <FieldArray name="subtasks">
                    {(props) => {
                      const { push, remove, form } = props;
                      const { values } = form;
                      const { subtasks } = values;

                      return (
                        <div>
                          {subtasks.map((column, idx) => (
                            <div key={idx}>
                              <Field name={`subtasks.${idx}.title`} />
                            </div>
                          ))}
                          <AddSubtaskBtn
                            type="button"
                            onClick={() => {
                              push({ title: "" });
                            }}
                          >
                            + Add new Subtask
                          </AddSubtaskBtn>
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>

                <CreateTask type="submit" onClick={() => {}}>
                  Save Changes
                </CreateTask>
              </Form>
            </Formik>
          </TaskEditSubtaskList>

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
        </TaskEdit>
      )}
    </Modal>
  );
};

export default EditTask;
