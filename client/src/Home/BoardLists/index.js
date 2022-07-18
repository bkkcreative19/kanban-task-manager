import axios from "axios";
import React, { useEffect, useState } from "react";

import BoardList from "./BoardList";
import { Lists } from "./Styles";

const BoardLists = ({ actives }) => {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const test = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/boards/${actives[0]}`
      );

      setBoard(data[0]);
    };

    test();
  }, [actives]);

  return (
    <>
      <Lists>
        {board &&
          board.columnTypes.map((column, idx) => {
            return <BoardList key={idx} column={column} index={idx} />;
          })}
      </Lists>
    </>
  );
};

export default BoardLists;
