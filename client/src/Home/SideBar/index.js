import React, { useState } from "react";
import Icon from "../../assets/icon-board.svg";
import {
  Board,
  BoardIcon,
  BoardList,
  BoardTitle,
  SideBar,
  Title,
} from "./Styles";
import ThemeToggle from "./ThemeToggle";
import styled from "styled-components";

const KabanSideBar = ({ boards, yay, theme }) => {
  const [actives, setActives] = useState([0]);
  const handleClick = (e) => {
    let test = [];
    setActives([]);
    test.push(Number(e.target.attributes["0"].value));
    setActives(test);
  };
  console.log(actives);
  return (
    <SideBar>
      <Title>{`All Boards (${boards.boards.length})`}</Title>
      <BoardList>
        {boards.boards.map((board, idx) => {
          return (
            <Board
              data-id={idx}
              onClick={handleClick}
              key={idx}
              isActive={actives.includes(idx) ? true : false}
            >
              <BoardIcon src={Icon} />
              <BoardTitle isActive={actives.includes(idx) ? true : false}>
                {board.name}
              </BoardTitle>
            </Board>
          );
        })}
      </BoardList>
      <ThemeToggle yay={yay} theme={theme} />
    </SideBar>
  );
};

export default KabanSideBar;
