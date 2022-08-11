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

import { editBoard, getBoardWithColumns } from "../../shared/api/boardsApi";
import { addColumn2 } from "../../shared/api/columnsApi";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteColumn, getColumns } from "../../shared/api/columnsApi";
import { isEqual } from "../../shared/utils/isEqual";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { useSelector } from "react-redux";
import {
  selectBoardsResult,
  selectAllBoards,
  selectBoardById,
  useUpdateBoardMutation,
} from "../../shared/features/board/boardSlice";
import { values } from "lodash";

const EditBoard = () => {
  const navigate = useNavigate();
  // const { active } = useOutletContext();

  //   const board = boards.find((board) => board.id === actives[0]);

  // const [board, setBoard] = useState();
  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState([]);
  const { active } = useSelector((state) => state.activeBoard);
  const [updateBoard, { isLoading }] = useUpdateBoardMutation();
  const board = useSelector((state) => selectBoardById(state, active));

  // console.log(columns);
  // console.log(
  //   yay.data.find((item) => item.id === Number(localStorage.getItem("active")))
  //     .columnTypes
  // );
  // const queryClient = useQueryClient();

  // const {
  //   // isLoading,
  //   // isError,
  //   data: board,
  // } = useQuery(["board", active], () => getBoardWithColumns(active));
  // const {
  //   // isLoading,
  //   // isError,
  //   data: columnss,
  // } = useQuery(["columns", active], () => getColumns(active));
  //   console.log(board);

  useEffect(() => {
    if (board) {
      setColumns(board.columnTypes);
    }
  }, [board]);

  const addColumn = (columnName) => {
    let test = [...board.columnTypes];
    // console.log(test.length);
    let newColumn = {
      type: "text",
      placeholder: "placeholder text",
      name: `text${test.length}`,
      value: "",
    };
    test.push(newColumn);
    setColumns(test);
  };

  const removeColumn = async (id) => {
    let test = [...columns];
    const newArr = [...board.columnTypes].filter((item) => item.id !== id);

    // await axios.delete(`http://localhost:5000/columns/${id}`);
    setColumns(newArr);
  };

  // const mutateDeleteColumn = useMutation(deleteColumn, {
  //   onSuccess: (data) => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries(["columns"]);
  //   },
  // });
  // const mutateAddColumn = useMutation(addColumn2, {
  //   onSuccess: (data) => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries(["columns"]);
  //   },
  // });

  // const mutateEditBoard = useMutation(editBoard, {
  //   onSuccess: (data) => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries(["boards"]);
  //     queryClient.invalidateQueries(["columns"]);
  //   },
  // });

  const handleInputChange = (e) => {
    let columnsTest = columns.slice();

    for (let i in columnsTest) {
      console.log(e.target);
      if (columnsTest[i].name === e.target.name) {
        columnsTest[i].name = e.target.value;
        setColumns(columnsTest);
        break;
      }
    }
  };

  const renderInput = (input, i) => {
    // console.log(input);
    return (
      <BoardEditColumnItem key={i}>
        <BoardEditColumnInput
          type={input.type}
          name={input.name}
          placeholder={input.placeholder}
          // onBlur={this.saveModule}
          value={input.name}
          onChange={handleInputChange}
        />
        <BoardEditColumnX
          onClick={() => {
            // mutateDeleteColumn.mutate(input.id);
            removeColumn(input.id);
          }}
        >
          X
        </BoardEditColumnX>
      </BoardEditColumnItem>
    );
  };

  // console.log(columns);
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
                      console.log(columns);
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

                <SaveBoard
                  type="submit"
                  onClick={() => {
                    // console.log(values);
                    // if (!boardName) {
                    //   navigate("/");
                    //   return;
                    // }
                    // updateBoard({ id: board.id, boardName, columns });
                    // mutateEditBoard.mutate({
                    //   boardName,
                    //   boardId: board.id,
                    //   columns,
                    // });
                    // navigate("/");
                  }}
                >
                  Save Changes
                </SaveBoard>
              </Form>
            </Formik>
            {/* {columns.length > 0
              ? columns.map(renderInput)
              : board.columnTypes.map(renderInput)} */}
          </BoardEditColumnList>
          {/* <AddColumnBtn onClick={addColumn}>+ Add new Column</AddColumnBtn> */}

          {/* onChange={(e) => setBoardName(e.target.value)} */}
        </BoardEdit>
      )}
    </Modal>
  );
};

export default EditBoard;
