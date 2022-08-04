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

const BoardHeader = () => {
  const navigate = useNavigate();
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
          <Title>Platform Launch</Title>
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
