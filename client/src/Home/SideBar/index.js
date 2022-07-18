import React, { useState } from "react";
import BoardIconImg from "../../assets/icon-board.svg";
import HideIconImg from "../../assets/icon-hide-sidebar.svg";

import {
  AddBoardBtn,
  AddBoardBtnText,
  Board,
  BoardIcon,
  BoardList,
  BoardTitle,
  HideSideBar,
  HideSideBarIcon,
  HideSideBarText,
  SideBar,
  Title,
} from "./Styles";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";

const KabanSideBar = ({
  boards,
  yay,
  theme,
  isOpen,
  setIsOpen,
  actives,
  setActives,
}) => {
  const navigate = useNavigate();

  const handleClick = (e, id) => {
    let test = [];
    setActives([]);
    test.push(id);
    setActives(test);
  };

  return (
    <SideBar isOpen={isOpen}>
      <Title>{`All Boards (${boards.length})`}</Title>
      <BoardList>
        {boards.map((board, idx) => {
          // console.log(board);
          return (
            <Board
              data-id={idx}
              onClick={(e) => handleClick(e, board.id)}
              key={idx}
              isActive={actives.includes(board.id) ? true : false}
            >
              <BoardIcon src={BoardIconImg} />
              <BoardTitle isActive={actives.includes(board.id) ? true : false}>
                {board.name}
              </BoardTitle>
            </Board>
          );
        })}
      </BoardList>
      <AddBoardBtn onClick={() => navigate("/addBoard")}>
        <BoardIcon src={BoardIconImg} />
        <AddBoardBtnText>+ Create New Board</AddBoardBtnText>
      </AddBoardBtn>

      <ThemeToggle yay={yay} theme={theme} />
      <HideSideBar onClick={() => setIsOpen(false)}>
        <HideSideBarIcon src={HideIconImg} />
        <HideSideBarText>Hide Sidebar</HideSideBarText>
      </HideSideBar>
    </SideBar>
  );
};

export default KabanSideBar;
