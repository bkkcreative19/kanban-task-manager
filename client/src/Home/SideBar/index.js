import React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../shared/services/board/boardSlice";
import { useEffect } from "react";

const KabanSideBar = ({ boards, yay, theme, isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const activeBoard = useSelector((state) => state.activeBoard);

  const handleClick = (e, id) => {
    localStorage.setItem("active", id);
    dispatch(setActive(Number(id)));
  };

  useEffect(() => {}, []);

  return (
    <SideBar isOpen={isOpen}>
      <Title>{`All Boards (${boards.length})`}</Title>
      <BoardList>
        {boards.map((board, idx) => {
          return (
            <Board
              data-id={idx}
              onClick={(e) => {
                handleClick(e, board.id);
              }}
              key={idx}
              isActive={activeBoard.active === board.id ? true : false}
            >
              <BoardIcon src={BoardIconImg} />
              <BoardTitle
                isActive={activeBoard.active === board.id ? true : false}
              >
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
