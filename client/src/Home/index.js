import React, { useState } from "react";
import KabanSideBar from "./SideBar";
import { HomePage, OpenStuff } from "./Styles";
import ShowSide from "../assets/icon-show-sidebar.svg";
import { Outlet, useParams } from "react-router-dom";
import BoardLists from "./BoardLists";

import { useQuery } from "@tanstack/react-query";
import useIsActive from "../shared/hooks/useIsActive";
import { getBoards } from "../shared/api/boardsApi";

const Home = ({ yay, theme }) => {
  const [isOpen, setIsOpen] = useState(true);

  const [active, setActive] = useIsActive(
    Number(localStorage.getItem("active"))
  );

  const { isLoading, isError, data: boards } = useQuery(["boards"], getBoards);

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
    </HomePage>
  );
};

export default Home;
