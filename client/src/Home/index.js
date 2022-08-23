import React, { useState } from "react";
import KabanSideBar from "./SideBar";
import { HomePage, OpenStuff } from "./Styles";
import ShowSide from "../assets/icon-show-sidebar.svg";
import { Outlet } from "react-router-dom";
import BoardLists from "./BoardLists";
import useApi from "../shared/hooks/api";

import {
  useGetBoardsQuery,
  selectAllBoards,
} from "../shared/services/board/boardSlice";

import {
  selectAllColumns,
  selectColumnsResult,
} from "../shared/services/columns/columnsSlice";

import { useSelector } from "react-redux";

const Home = ({ yay, theme }) => {
  const [isOpen, setIsOpen] = useState(true);

  const { data: boards, isLoading, isSuccess, isError } = useGetBoardsQuery();

  // const [{ data: boards, error, setLocalData }, fetchBoards] =
  //   useApi.get("/boards");

  const activeBoard = useSelector((state) => state.activeBoard);
  const test = useSelector(selectAllColumns);

  console.log(boards);

  return (
    <HomePage>
      {!boards && "loading"}
      {isError && "error"}
      {boards && (
        <KabanSideBar
          boards={boards}
          yay={yay}
          theme={theme}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      {!isOpen && (
        <OpenStuff onClick={() => setIsOpen(true)}>
          <img src={ShowSide} alt="" />
        </OpenStuff>
      )}
      <BoardLists active={activeBoard.active} />
      <Outlet context={{ boards }} />
    </HomePage>
  );
};

export default Home;
