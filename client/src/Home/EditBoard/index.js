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
} from "../../shared/features/board/boardSlice";

const EditBoard = () => {
  const navigate = useNavigate();

  const [boardName, setBoardName] = useState("");

  const { active } = useSelector((state) => state.activeBoard);
  const [updateBoard, { isLoading }] = useUpdateBoardMutation();
  const board = useSelector((state) => selectBoardById(state, active));

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
              initialValues={{ columns: board.columnTypes }}
              onSubmit={(values) => {
                if (!boardName) {
                  navigate("/");
                  return;
                }
                updateBoard({
                  id: board.id,
                  boardName,
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
                      return (
                        <div>
                          {columns.map((column, idx) => (
                            <div key={idx}>
                              <Field name={`columns.${idx}.name`} />
                            </div>
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
