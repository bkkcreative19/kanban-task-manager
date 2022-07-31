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
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteColumn } from "../../shared/api/columnsApi";

const EditBoard = () => {
  const navigate = useNavigate();
  const { active } = useOutletContext();

  //   const board = boards.find((board) => board.id === actives[0]);
  // const [board, setBoard] = useState();
  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState([]);

  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: board,
  } = useQuery(["board", active], () => getBoardWithColumns(active));
  //   console.log(board);

  const addColumn = (columnName) => {
    let test = [...board.columnTypes];
    // console.log(test.length);
    let newColumn = {
      type: "text",
      placeholder: "placeholder text",
      name: `text${test.length}`,
      id: test.length,
      value: "",
    };
    test.push(newColumn);
    setColumns(test);
  };

  // const removeColumn = async (id) => {
  //   // let test = [...columns];
  //   // const newArr = [...board.columnTypes].filter((item) => item.id !== id);
  //   console.log(id);
  //   await axios.delete(`http://localhost:5000/columns/${id}`);
  //   // setColumns(newArr);
  // };

  const mutation = useMutation(deleteColumn, {
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["boards"]);
    },
  });

  const mutation1 = useMutation(editBoard, {
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["boards"]);
      navigate("/");
    },
  });

  // const editBoard = async () => {
  //   const { data } = await axios.put(
  //     `http://localhost:5000/boards/${board.id}`,
  //     {
  //       name: boardName,
  //     }
  //   );
  //   await axios.put(`http://localhost:5000/columns/${board.id}`, {
  //     columns,
  //   });

  //   // navigate("/");
  // };

  const handleInputChange = (e) => {
    let columnsTest = columns.slice();
    for (let i in columnsTest) {
      if (columnsTest[i].name === e.target.name) {
        columnsTest[i].name = e.target.value;
        setColumns(columnsTest);
        break;
      }
    }
  };

  const renderInput = (input, i) => {
    return (
      <BoardEditColumnItem key={input.id}>
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
            mutation.mutate(input.id);
          }}
        >
          X
        </BoardEditColumnX>
      </BoardEditColumnItem>
    );
  };

  //   console.log(board);
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
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />
          </BoardEditInput>
          <BoardEditColumnList>
            <BoardEditColumnHead>Board Columns</BoardEditColumnHead>
            {columns.length > 0
              ? columns.map(renderInput)
              : board.columnTypes.map(renderInput)}
          </BoardEditColumnList>
          <AddColumnBtn onClick={addColumn}>+ Add new Column</AddColumnBtn>
          <SaveBoard
            onClick={() => {
              mutation1.mutate([boardName, board.id]);
            }}
          >
            Save Changes
          </SaveBoard>
          {/* onChange={(e) => setBoardName(e.target.value)} */}
        </BoardEdit>
      )}
    </Modal>
  );
};

export default EditBoard;
