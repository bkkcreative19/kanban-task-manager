import React, { useEffect, useState } from "react";
import KabanSideBar from "./SideBar";
import { HomePage, OpenStuff, Test } from "./Styles";
import ShowSide from "../assets/icon-show-sidebar.svg";
import { Outlet, useParams } from "react-router-dom";
import BoardLists from "./BoardLists";
import axios from "axios";
import TaskDetails from "./TaskDetails";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useIsActive from "../shared/hooks/useIsActive";
import { getBoards } from "../shared/api/boardsApi";

const Home = ({ yay, theme }) => {
  // const [boards, setBoards] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const queryClient = useQueryClient();

  const [active, setActive] = useIsActive(
    Number(localStorage.getItem("active"))
  );

  const { isLoading, isError, data: boards } = useQuery(["boards"], getBoards);

  // const { isLoading, isError, data } = useQuery("boards", getBoards);
  const params = useParams();

  // useEffect(() => {
  //   setActive(Number(localStorage.getItem("active")));
  //   console.log(active);
  // }, [active]);
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
      {!isOpen && (
        <OpenStuff onClick={() => setIsOpen(true)}>
          <img src={ShowSide} alt="" />
        </OpenStuff>
      )}
      <BoardLists active={active} />
      <Outlet context={{ boards, setActive, active }} />
      {/* <Outlet /> */}
    </HomePage>
  );
};

export default Home;
