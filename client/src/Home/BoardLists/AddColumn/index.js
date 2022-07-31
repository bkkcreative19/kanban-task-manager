import React from "react";
import { ColumnAdd, ColumnText } from "./Styles";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { addColumn } from "../../../shared/api/columnsApi";
import { useState } from "react";

const AddColumn = ({ board }) => {
  const queryClient = useQueryClient();
  const [readyType, setReadyType] = useState(false);
  const [name, setName] = useState("");

  const mutation = useMutation(addColumn, {
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["board"]);
      console.log(data);
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
              boardId: board.id,
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
