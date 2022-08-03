import React from "react";
import { ColumnAdd, ColumnText } from "./Styles";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { addColumn2 } from "../../../shared/api/columnsApi";
import { useState } from "react";

const AddColumn = ({ boardId }) => {
  const queryClient = useQueryClient();
  const [readyType, setReadyType] = useState(false);
  const [name, setName] = useState("");

  const mutation = useMutation(addColumn2, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["columns"]);
      // localStorage.setItem("active", data.board.id);
      // setActive(Number(localStorage.getItem("active")));
    },
  });

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
            mutation.mutate({
              name: name,
              boardId,
            });
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
