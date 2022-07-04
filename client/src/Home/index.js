import React, { useEffect, useState } from "react";
import KabanSideBar from "./SideBar";
import { HomePage, OpenStuff, Test } from "./Styles";
import ShowSide from "../assets/icon-show-sidebar.svg";
import { Outlet, useParams } from "react-router-dom";
import BoardLists from "./BoardLists";
import axios from "axios";
import TaskDetails from "./TaskDetails";

const Home = ({ yay, theme }) => {
  const [boards, setBoards] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [actives, setActives] = useState([1]);

  const params = useParams();

  // console.log(params);

  useEffect(() => {
    const test = async () => {
      const { data } = await axios.get("http://localhost:5000/boards");

      setBoards(data);
    };

    test();
  }, []);

  return (
    <HomePage>
      {boards && (
        <KabanSideBar
          boards={boards}
          yay={yay}
          theme={theme}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          actives={actives}
          setActives={setActives}
        />
      )}
      {!isOpen && (
        <OpenStuff onClick={() => setIsOpen(true)}>
          <img src={ShowSide} alt="" />
        </OpenStuff>
      )}
      <BoardLists actives={actives} />
      <Outlet context={{ actives, boards }} />
      {/* <Outlet /> */}
    </HomePage>
  );
};

export default Home;
