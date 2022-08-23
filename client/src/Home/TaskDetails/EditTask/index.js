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

import {
  useGetTaskQuery,
  useUpdateTaskMutation,
} from "../../../shared/services/task/tasksSlice";
import { useSelector } from "react-redux";
import { selectBoardById } from "../../../shared/services/board/boardSlice";
import { Field, FieldArray, Form, Formik } from "formik";
import { BiX } from "react-icons/bi";

const EditTask = () => {
  const [taskName, setTaskName] = useState("");
  const [column, setColumn] = useState();
  const params = useParams();
  const [description, setdescription] = useState("");

  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  const navigate = useNavigate();
  const { active } = useSelector((state) => state.activeBoard);
  const { data: task } = useGetTaskQuery(params.taskTitle);

  const board = useSelector((state) => selectBoardById(state, active));
  const columns = board && board.columnTypes;
  const columnNames = board && board.columnTypes.map((column) => column.name);

  console.log(column);

  useEffect(() => {
    if (task && columns) {
      const test = columns.find((item) => item.id === task.columnTypeId);
      setColumn(test);
    }
  }, [task, columns]);

  const handleSetSelected = (e) => {
    const test = columns.find((item) => item.name === e);
    setColumn(test);
  };

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

                updateTask({
                  title: taskName ? taskName : task.title,
                  description,
                  taskId: task.id,
                  subtasks: values.subtasks,
                  columnType: !column ? task.columnType : column.id,
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
                          {subtasks.map((subtask, idx) => (
                            <TaskEditSubtaskItem key={idx}>
                              <Field name={`subtasks.${idx}.title`}>
                                {({ field }) => {
                                  return (
                                    <TaskEditSubtaskInput
                                      {...field}
                                      value={subtask.title}
                                      placeholder="e.g. Make coffee"
                                    />
                                  );
                                }}
                              </Field>
                              <BiX
                                color="#828FA3"
                                size={"4em"}
                                cursor="pointer"
                                onClick={() => remove(idx)}
                              />
                            </TaskEditSubtaskItem>
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
              selected={column && column.name}
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
