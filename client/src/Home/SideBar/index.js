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
import useIsActive from "../../shared/hooks/useIsActive";

const KabanSideBar = ({
  boards,
  yay,
  theme,
  isOpen,
  setIsOpen,
  active,
  setActive,
}) => {
  const navigate = useNavigate();
  // const [active, setActive] = useIsActive();

  const handleClick = (e, id) => {
    localStorage.setItem("active", id);
    setActive(Number(localStorage.getItem("active")));
    // console.log(typeof );
    // setActives(test);
    // setActive(2);
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
              isActive={active === board.id ? true : false}
            >
              <BoardIcon src={BoardIconImg} />
              <BoardTitle isActive={active === board.id ? true : false}>
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
