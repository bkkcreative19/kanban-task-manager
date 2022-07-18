import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Modal from "../../shared/components/Modal";
import {
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
} from "./Styles";

const EditBoard = () => {
  const navigate = useNavigate();
  const { actives, boards } = useOutletContext();
  //   const board = boards.find((board) => board.id === actives[0]);
  const [board, setBoard] = useState();
  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const getBoard = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/boards/${actives[0]}`
      );
      setBoard(data[0]);
      setBoardName(data[0].name);
      setColumns(data[0].columnTypes);
    };

    getBoard();
  }, []);

  //   console.log(board);

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
        columnsTest[i].name = e.target.value;
        setColumns(columnsTest);
        break;
      }
    }
  };

  console.log(columns);

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
        <BoardEditColumnX onClick={() => removeColumn(input.id)}>
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
            {columns.map(renderInput)}
          </BoardEditColumnList>
          {/* <AddColumnBtn onClick={addColumn}>+ Add new Column</AddColumnBtn>
        <CreateBoard onClick={addBoard}>Create New Board</CreateBoard> */}
          {/* onChange={(e) => setBoardName(e.target.value)} */}
        </BoardEdit>
      )}
    </Modal>
  );
};

export default EditBoard;
