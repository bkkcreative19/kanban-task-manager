import React, { useEffect, useState } from "react";
import BoardList from "./BoardList";
import { Lists } from "./Styles";

const BoardLists = ({ actives }) => {
  const [board, setBoard] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const test = async () => {
      const res = await fetch("data.json");

      const data = await res.json();
      for (let i = 0; i < data.boards.length; i++) {
        if (actives[0] === i) {
          setBoard(data.boards[i]);
        }
      }
    };

    test();
  }, [actives]);
  // console.log(actives);
  return (
    <Lists>
      {board &&
        board.columns.map((column, idx) => {
          return <BoardList key={idx} column={column} index={idx} />;
        })}
    </Lists>
  );
};

export default BoardLists;
