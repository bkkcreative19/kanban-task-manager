import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  CreateTask,
  StatusTitle,
} from "./Styles";

import Select from "../../shared/components/Select";
import { useSelector } from "react-redux";

import { useCreateTaskMutation } from "../../shared/services/task/tasksSlice";

import { selectBoardById } from "../../shared/services/board/boardSlice";
import { selectAllColumns } from "../../shared/services/columns/columnsSlice";
import { Field, FieldArray, Form, Formik } from "formik";
import { BiX } from "react-icons/bi";

const AddTask = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setdescription] = useState("");
  const [status, setStatus] = useState("");
  const { active } = useSelector((state) => state.activeBoard);
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const board = useSelector((state) =>
    selectBoardById(
      state,
      active === 0 ? Number(localStorage.getItem("active")) : active
    )
  );
  const navigate = useNavigate();

  const columnNames = useSelector(selectAllColumns);

  useEffect(() => {
    if (columnNames.length > 0) {
      setStatus(columnNames[0]);
    }
  }, [board]);

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
          <Formik
            initialValues={{ subtasks: [] }}
            onSubmit={(values) => {
              createTask({
                title: taskName,
                description,
                // subtasks: values.subtasks,
                status,
                boardId: board.id,
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
                          <TaskAddSubtaskItem key={idx}>
                            <Field name={`subtasks.${idx}.title`}>
                              {({ field }) => {
                                return (
                                  <TaskAddSubtaskInput
                                    {...field}
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
                          </TaskAddSubtaskItem>
                        ))}
                        <AddSubtaskBtn
                          type="button"
                          onClick={() => push({ title: "" })}
                        >
                          + Add new Subtask
                        </AddSubtaskBtn>
                      </div>
                    );
                  }}
                </FieldArray>
              </div>

              <CreateTask type="submit">Create New Task</CreateTask>
            </Form>
          </Formik>
        </TaskAddSubtaskList>

        <StatusTitle>Status</StatusTitle>
        {columnNames && (
          <Select
            setSelected={setStatus}
            selected={status}
            options={columnNames}
          />
        )}
      </TaskAdd>
    </Modal>
  );
};

export default AddTask;
