import React, { useEffect, useState } from "react";
import KabanSideBar from "./SideBar";
import { HomePage } from "./Styles";

const Home = ({ yay, theme }) => {
  const [boards, setBoards] = useState(null);
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
      {boards && <KabanSideBar boards={boards} yay={yay} theme={theme} />}
    </HomePage>
  );
};

export default Home;
