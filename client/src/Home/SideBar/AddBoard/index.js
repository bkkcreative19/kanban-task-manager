import React, { useState } from "react";
import Modal from "../../../shared/components/Modal";
import axios from "axios";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addBoard } from "../../../shared/api/boardsApi";

const AddBoard = () => {
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [setActive] = useOutletContext();
  const [boardName, setBoardName] = useState("");
  const queryClient = useQueryClient();
  const addColumn = (columnName) => {
    let test = [...columns];
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

  const removeColumn = (id) => {
    // let test = [...columns];
    const newArr = [...columns].filter((item) => item.id !== id);
    setColumns(newArr);
  };

  const handleInputChange = (e) => {
    let columnsTest = columns.slice();
    for (let i in columnsTest) {
      if (columnsTest[i].name == e.target.name) {
        columnsTest[i].value = e.target.value;
        setColumns(columnsTest);
        break;
      }
    }
  };

  // Queries

  // Mutations
  const mutation = useMutation(addBoard, {
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["boards"]);
      localStorage.setItem("active", data.board.id);
      setActive(Number(localStorage.getItem("active")));
    },
  });

  // console.log(columns);
  const renderInput = (input, i) => {
    return (
      <BoardAddColumnItem key={input.id}>
        <BoardAddColumnInput
          type={input.type}
          name={input.name}
          placeholder={input.placeholder}
          // onBlur={this.saveModule}
          value={input.value}
          onChange={handleInputChange}
        />
        <BoardAddColumnX onClick={() => removeColumn(input.id)}>
          X
        </BoardAddColumnX>
      </BoardAddColumnItem>
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
      <BoardAdd>
        <BoardAddHead>Add New Board</BoardAddHead>
        <BoardAddInput>
          <BoardAddInputLabel>Board Name</BoardAddInputLabel>
          <BoardAddInputField onChange={(e) => setBoardName(e.target.value)} />
        </BoardAddInput>
        <BoardAddColumnList>
          <BoardAddColumnHead>Columns</BoardAddColumnHead>
          {columns.map(renderInput)}
        </BoardAddColumnList>
        <AddColumnBtn onClick={addColumn}>+ Add new Column</AddColumnBtn>
        <CreateBoard
          onClick={() => {
            mutation.mutate({
              name: boardName,
              columns,
            });
            navigate("/");
          }}
        >
          Create New Board
        </CreateBoard>
      </BoardAdd>
    </Modal>
  );
};

export default AddBoard;
