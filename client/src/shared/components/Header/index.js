import React, { useState } from "react";

import ChevronDown from "../../../assets/icon-chevron-down.svg";
import { FaPlus } from "react-icons/fa";
import {
  Header,
  Nav,
  Lines,
  Logo,
  LogoName,
  Right,
  Title,
  DownArrow,
  Options,
  AddTask,
  Cross,
} from "./Styles";

import OptionsLogo from "../OptionsLogo";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectAllBoards } from "../../services/board/boardSlice";
import useIsSidebar from "../../hooks/useIsSideBarOpen";
import MobileSide from "../../../Home/SideBar/MobileSide";

const BoardHeader = ({ theme, yay }) => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { active } = useSelector((state) => state.activeBoard);
  const boards = useSelector(selectAllBoards);
  const board = boards.find((board) => board.id === active);

  return (
    <Header>
      <Nav>
        <Logo>
          <Lines className="lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </Lines>
          <LogoName>kanban</LogoName>
        </Logo>
        <Right>
          <Title>{board && board.name}</Title>
          <DownArrow
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            src={ChevronDown}
          />

          <Options>
            <AddTask onClick={() => navigate("/addTask")}>
              + Add New Task
            </AddTask>
            <Cross>
              <FaPlus onClick={() => navigate("/addTask")} size={"1.1em"} />
            </Cross>
            <OptionsLogo
              type={"Board"}
              editRoute={"/editBoard"}
              deleteRoute={"/deleteBoard"}
            />
          </Options>
        </Right>
      </Nav>

      {isSidebarOpen && (
        <MobileSide
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
          theme={theme}
          yay={yay}
        />
      )}
    </Header>
  );
};

export default BoardHeader;
