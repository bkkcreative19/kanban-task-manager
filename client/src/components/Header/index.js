import React from "react";
import Image from "../../assets/icon-vertical-ellipsis.svg";
import Cross from "../../assets/icon-add-task-mobile.svg";
import ChevronDown from "../../assets/icon-chevron-down.svg";
import "./Header.scss";

export const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav__logo">
          <div className="lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>

          <h1>kanban</h1>
        </div>
        <div className="right">
          <h2>Platform Launch</h2>
          <img className="chevron-down" src={ChevronDown} alt="" />
          <div className="options">
            <button>+ Add New Task</button>
            <button className="mb">
              <img src={Cross} alt="" />
            </button>
            <img src={Image} alt="" />
          </div>
        </div>
      </nav>
    </header>
  );
};
