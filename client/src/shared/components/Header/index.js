import React from "react";

import ChevronDown from "../../../assets/icon-chevron-down.svg";
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

const BoardHeader = () => {
  const navigate = useNavigate();

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
          <DownArrow src={ChevronDown} />

          <Options>
            <AddTask onClick={() => navigate("/addTask")}>
              + Add New Task
            </AddTask>
            <Cross>
              <img src={Cross} alt="" />
            </Cross>
            <OptionsLogo
              type={"Board"}
              editRoute={"/editBoard"}
              deleteRoute={"/deleteBoard"}
            />
          </Options>
        </Right>
      </Nav>
    </Header>
  );
};

export default BoardHeader;
