import React from "react";
import { ColumnAdd, ColumnText } from "./Styles";

import { useState } from "react";
import { useCreateColumnMutation } from "../../../shared/services/columns/columnsSlice";

const AddColumn = ({ boardId }) => {
  const [readyType, setReadyType] = useState(false);
  const [name, setName] = useState("");

  const [createColumn, { isLoading }] = useCreateColumnMutation();
  // const mutation = useMutation(addColumn2, {
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries(["columns"]);
  //     // localStorage.setItem("active", data.board.id);
  //     // setActive(Number(localStorage.getItem("active")));
  //   },
  // });

  return (
    <ColumnAdd
      onClick={() => {
        setReadyType(true);
      }}
    >
      {readyType ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createColumn({ name, boardId });
            // mutation.mutate({

            // });
            setReadyType(false);
          }}
        >
          <input onChange={(e) => setName(e.target.value)} type="text" />
        </form>
      ) : (
        <ColumnText>+ New Column</ColumnText>
      )}
    </ColumnAdd>
  );
};

export default AddColumn;
