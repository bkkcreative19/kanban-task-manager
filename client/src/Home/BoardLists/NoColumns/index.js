import React, { useState } from "react";
import { useCreateColumnMutation } from "../../../shared/services/columns/columnsSlice";
import { EmptyBtn, EmptyColumns, EmptyText } from "./Styles";

const NoColumns = ({ boardId }) => {
  const [readyType, setReadyType] = useState(false);
  const [name, setName] = useState("");
  const [createColumn, { isLoading }] = useCreateColumnMutation();

  return (
    <EmptyColumns>
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
        <>
          <EmptyText>
            This board is empty. Create a new column to get started.
          </EmptyText>
          <EmptyBtn
            onClick={() => {
              setReadyType(true);
            }}
          >
            + Add New Column
          </EmptyBtn>
        </>
      )}
    </EmptyColumns>
  );
};

export default NoColumns;
