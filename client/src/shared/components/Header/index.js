import React from "react";
import Ellipsis from "../../../assets/icon-vertical-ellipsis.svg";

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
  Dots,
} from "./Styles";
import OptionsLogo from "../OptionsLogo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import useIsActive from "../../hooks/useIsActive";

const BoardHeader = () => {
  const navigate = useNavigate();
  const [boardName, setBoardName] = useState(localStorage.getItem("boardName"));

  const [active, setActive] = useIsActive(
    Number(localStorage.getItem("active"))
  );

  useEffect(() => {
    setBoardName(localStorage.getItem("boardName"));
  }, [active]);
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
          <Title>{boardName}</Title>
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
