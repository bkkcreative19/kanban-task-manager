import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Modal from "../../shared/components/Modal";
import {
  AddColumnBtn,
  BoardEdit,
  BoardEditColumnHead,
  BoardEditColumnInput,
  BoardEditColumnItem,
  BoardEditColumnList,
  BoardEditColumnX,
  BoardEditHead,
  BoardEditInput,
  BoardEditInputField,
  BoardEditInputLabel,
  SaveBoard,
} from "./Styles";

import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { useSelector } from "react-redux";
import {
  selectBoardById,
  useUpdateBoardMutation,
} from "../../shared/services/board/boardSlice";
import { BiX } from "react-icons/bi";
import { selectAllColumns } from "../../shared/services/columns/columnsSlice";

const EditBoard = () => {
  const navigate = useNavigate();

  const [boardName, setBoardName] = useState("");

  const { active } = useSelector((state) => state.activeBoard);
  const [updateBoard, { isLoading }] = useUpdateBoardMutation();
  const board = useSelector((state) => selectBoardById(state, active));
  const columns = useSelector(selectAllColumns);

  console.log(columns);

  return (
    <Modal
      isOpen={true}
      width={480}
      withCloseIcon={false}
      onClose={() => navigate("/")}
    >
      {board && (
        <BoardEdit>
          <BoardEditHead>Edit Board</BoardEditHead>
          <BoardEditInput>
            <BoardEditInputLabel>Board Name</BoardEditInputLabel>
            <BoardEditInputField
              value={!boardName ? board.name : boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />
          </BoardEditInput>
          <BoardEditColumnList>
            <BoardEditColumnHead>Board Columns</BoardEditColumnHead>
            <Formik
              initialValues={{ columns: columns }}
              onSubmit={(values) => {
                // if (!boardName) {
                //   navigate("/");
                //   return;
                // }

                updateBoard({
                  id: board.id,
                  boardName: !boardName ? board.name : boardName,
                  columns: values.columns,
                });
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
                      console.log(columns);
                      return (
                        <div>
                          {columns?.map((column, idx) => (
                            <BoardEditColumnItem key={idx}>
                              <Field name={`columns${idx}`}>
                                {({ field }) => {
                                  return (
                                    <BoardEditColumnInput
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
                            </BoardEditColumnItem>
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

                <SaveBoard type="submit" onClick={() => {}}>
                  Save Changes
                </SaveBoard>
              </Form>
            </Formik>
          </BoardEditColumnList>
        </BoardEdit>
      )}
    </Modal>
  );
};

export default EditBoard;
