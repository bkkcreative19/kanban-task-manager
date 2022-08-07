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
import { deleteBoard, getBoardWithColumns } from "../../shared/api/boardsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../shared/features/board/boardSlice";
import { useEffect } from "react";

const KabanSideBar = ({ boards, yay, theme, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  // const [active, setActive] = useIsActive();
  // const queryClient = useQueryClient();
  const dispatch = useDispatch();
  // const mutateDeleteBoard = useMutation(deleteBoard, {
  //   onSuccess: (data) => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries(["boards"]);
  //   },
  // });
  const activeBoard = useSelector((state) => state.activeBoard);

  const handleClick = (e, id) => {
    localStorage.setItem("active", id);
    dispatch(setActive(Number(id)));

    // setActive(Number(localStorage.getItem("active")));
    // console.log(typeof );
    // setActives(test);
    // setActive(2);
  };

  useEffect(() => {}, []);

  return (
    <SideBar isOpen={isOpen}>
      <Title
      // onClick={() => {
      //   mutateDeleteBoard.mutate(active);
      // }}
      >{`All Boards (${boards.length})`}</Title>
      <BoardList>
        {boards.map((board, idx) => {
          return (
            <Board
              data-id={idx}
              onClick={(e) => handleClick(e, board.id)}
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
