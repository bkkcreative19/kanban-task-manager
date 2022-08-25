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
  useGetBoardQuery,
} from "../shared/services/board/boardSlice";

import {
  selectAllColumns,
  selectColumnsResult,
  useGetColumnsQuery,
} from "../shared/services/columns/columnsSlice";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import useDidMountEffect from "../shared/hooks/useDidMountEffect";
import Loader from "../shared/components/Loader";

const Home = ({ yay, theme }) => {
  const [isOpen, setIsOpen] = useState(true);

  const { data: boards, isLoading, isSuccess, isError } = useGetBoardsQuery();

  const activeBoard = useSelector((state) => state.activeBoard);

  const { data: board } = useGetBoardQuery(activeBoard.active);
  const { data: columns } = useGetColumnsQuery(activeBoard.active);

  return (
    <HomePage>
      {!boards && <Loader />}
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
      {board && (
        <BoardLists
          board={board}
          active={activeBoard.active}
          columns={columns}
        />
      )}

      <Outlet context={[columns]} />
    </HomePage>
  );
};

export default Home;
