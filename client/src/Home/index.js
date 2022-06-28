import React, { useEffect, useState } from "react";
import KabanSideBar from "./SideBar";
import { HomePage, OpenStuff, Test } from "./Styles";
import ShowSide from "../assets/icon-show-sidebar.svg";
import { Outlet, Route, useParams } from "react-router-dom";
import BoardLists from "./BoardLists";

import TaskDetails from "./TaskDetails";
import Modal from "../components/Modal";

const Home = ({ yay, theme }) => {
  const [boards, setBoards] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [actives, setActives] = useState([0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams();

  // console.log(params);

  useEffect(() => {
    const test = async () => {
      const res = await fetch("data.json");
      const data = await res.json();
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
      <h1 onClick={() => setIsModalOpen(true)}>Click Me</h1>
      <Modal
        setIsModalOpen={setIsModalOpen}
        isOpen={isModalOpen}
        Content={(modal) => <Outlet />}
      />
    </HomePage>
  );
};

export default Home;
