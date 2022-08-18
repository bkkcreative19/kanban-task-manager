import React, { useState } from "react";
import Modal from "../../../shared/components/Modal";

import { useNavigate, useOutletContext } from "react-router-dom";
import {
  AddColumnBtn,
  BoardAdd,
  BoardAddColumnHead,
  BoardAddColumnInput,
  BoardAddColumnItem,
  BoardAddColumnList,
  BoardAddColumnX,
  BoardAddHead,
  BoardAddInput,
  BoardAddInputField,
  BoardAddInputLabel,
  CreateBoard,
} from "./Styles";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { useCreateBoardMutation } from "../../../shared/services/board/boardSlice";

import { BiX } from "react-icons/bi";
import FormComp from "../../../shared/components/Form";

const AddBoard = () => {
  const navigate = useNavigate();

  const [boardName, setBoardName] = useState("");
  const [createBoard, { isLoading, data }] = useCreateBoardMutation();

  return (
    <Modal
      isOpen={true}
      width={480}
      withCloseIcon={false}
      onClose={() => navigate("/")}
    >
      <BoardAdd>
        <BoardAddHead>Add New Board</BoardAddHead>
        <BoardAddInput>
          <BoardAddInputLabel>Board Name</BoardAddInputLabel>
          <BoardAddInputField
            placeholder="e.g. Web Design"
            onChange={(e) => setBoardName(e.target.value)}
          />
        </BoardAddInput>
        <BoardAddColumnList>
          <BoardAddColumnHead>Columns</BoardAddColumnHead>

          <Formik
            initialValues={{ columns: [] }}
            onSubmit={(values) => {
              createBoard({ name: boardName, columns: values.columns });
              navigate("/");
            }}
          >
            <Form>
              <div className="form-control">
                <FieldArray name="columns">
                  {(props) => {
                    const { push, remove, form } = props;
                    const { values } = form;
                    const { columns } = values;

                    return (
                      <div>
                        {columns.map((column, idx) => (
                          <BoardAddColumnItem key={idx}>
                            <Field name={`columns.${idx}.name`}>
                              {({ field }) => {
                                return (
                                  <BoardAddColumnInput
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
                          </BoardAddColumnItem>
                        ))}
                        <AddColumnBtn
                          type="button"
                          onClick={() => push({ name: "" })}
                        >
                          + Add new Column
                        </AddColumnBtn>
                      </div>
                    );
                  }}
                </FieldArray>
              </div>

              <CreateBoard type="submit">Create New Board</CreateBoard>
            </Form>
          </Formik>
        </BoardAddColumnList>
        {/* <AddColumnBtn onClick={addColumn}>+ Add new Column</AddColumnBtn> */}
        {/* <CreateBoard
          // onClick={() => {
          //   mutation.mutate({
          //     name: boardName,
          //     columns,
          //   });
          //   navigate("/");
          // }}
          onClick={() => {
            createBoard({ name: boardName, columns });
            navigate("/");
          }}
        >
          Create New Board
        </CreateBoard> */}
      </BoardAdd>
    </Modal>
  );
};

export default AddBoard;
