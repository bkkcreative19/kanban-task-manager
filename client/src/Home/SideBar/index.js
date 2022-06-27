import React, { useState } from "react";
import BoardIconImg from "../../assets/icon-board.svg";
import HideIconImg from "../../assets/icon-hide-sidebar.svg";
import {
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

const KabanSideBar = ({
  boards,
  yay,
  theme,
  isOpen,
  setIsOpen,
  actives,
  setActives,
}) => {
  const handleClick = (e) => {
    let test = [];
    setActives([]);
    test.push(Number(e.target.attributes["0"].value));
    setActives(test);
  };

  return (
    <SideBar isOpen={isOpen}>
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
              <BoardIcon src={BoardIconImg} />
              <BoardTitle isActive={actives.includes(idx) ? true : false}>
                {board.name}
              </BoardTitle>
            </Board>
          );
        })}
      </BoardList>
      <ThemeToggle yay={yay} theme={theme} />
      <HideSideBar onClick={() => setIsOpen(false)}>
        <HideSideBarIcon src={HideIconImg} />
        <HideSideBarText>Hide Sidebar</HideSideBarText>
      </HideSideBar>
    </SideBar>
  );
};

export default KabanSideBar;
