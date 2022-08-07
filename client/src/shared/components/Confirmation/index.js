import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { deleteBoard } from "../../api/boardsApi";
import { deleteTask } from "../../api/tasksApi";
import { useDeleteBoardMutation } from "../../features/board/boardSlice";
import Modal from "../Modal";
import {
  Confirm,
  ConfirmButtons,
  ConfirmCancel,
  ConfirmDelete,
  ConfirmHead,
  ConfirmText,
} from "./Styles";

const Confirmation = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { active, setActive, boards } = useOutletContext();
  const [deleteBoard, { isLoading }] = useDeleteBoardMutation();
  // console.log(params);
  // console.log(active);

  const [index, setIndex] = useState();

  // const deleteTaskMutation = useMutation(deleteTask, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["columns"]);
  //   },
  // });

  // const deleteBoardMutation = useMutation(deleteBoard, {
  //   onSuccess: (data) => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries(["boards"]);
  //     queryClient.invalidateQueries(["columns"]);
  //   },
  // });

  // console.log(!!params);

  useEffect(() => {
    if (boards) {
      let testt;
      const test = boards.find((item, idx) => {
        testt = idx - 1;
        return item.id === active;
      });
      setIndex(boards[testt].id);
    }
  }, [active]);
  // console.log(index);
  return (
    <Modal
      isOpen={true}
      width={480}
      withCloseIcon={false}
      onClose={() => navigate("/")}
    >
      <Confirm>
        <ConfirmHead>
          {!params.taskTitle ? "Delete this Board?" : "Delete this Task?"}
        </ConfirmHead>
        <ConfirmText>
          Are you sure you want to delete the ‘Platform Launch’ board? This
          action will remove all columns and tasks and cannot be reversed.
        </ConfirmText>
        <ConfirmButtons>
          <ConfirmDelete
            onClick={() => {
              if (params.taskTitle) {
                // deleteTaskMutation.mutate(params.taskTitle);
              } else {
                // deleteBoardMutation.mutate(active);
                deleteBoard(active);
              }

              navigate("/");
            }}
          >
            Delete
          </ConfirmDelete>
          <ConfirmCancel>Cancel</ConfirmCancel>
        </ConfirmButtons>
      </Confirm>
    </Modal>
  );
};

export default Confirmation;
