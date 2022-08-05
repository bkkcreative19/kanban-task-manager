import React, { useEffect, useState } from "react";
import KabanSideBar from "./SideBar";
import { HomePage, OpenStuff } from "./Styles";
import ShowSide from "../assets/icon-show-sidebar.svg";
import { Outlet, useParams } from "react-router-dom";
import BoardLists from "./BoardLists";

import { useQuery } from "@tanstack/react-query";
import useIsActive from "../shared/hooks/useIsActive";
import { getBoards } from "../shared/api/boardsApi";
import { useGetBoardsQuery } from "../shared/features/api/apiSlice";

const Home = ({ yay, theme }) => {
  const [isOpen, setIsOpen] = useState(true);

  const {
    data: boards,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBoardsQuery();

  const [active, setActive] = useIsActive(
    Number(localStorage.getItem("active"))
  );

  console.log(boards);

  // useEffect(() => {
  //   if (boards && active) {
  //     const board = boards.find((board) => board.id === active);

  //     localStorage.setItem("boardName", board.name);
  //   }
  // }, [active]);

  // const { isLoading, isError, data: boards } = useQuery(["boards"], getBoards);

  return (
    <HomePage>
      {isLoading && "loading"}
      {isError && "error"}
      {boards && (
        <KabanSideBar
          boards={boards}
          yay={yay}
          theme={theme}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          active={active}
          setActive={setActive}
        />
      )}
      {/* {!isOpen && (
        <OpenStuff onClick={() => setIsOpen(true)}>
          <img src={ShowSide} alt="" />
        </OpenStuff>
      )}
      <BoardLists active={active} /> */}
      <Outlet context={{ boards, setActive, active }} />
    </HomePage>
  );
};

export default Home;
