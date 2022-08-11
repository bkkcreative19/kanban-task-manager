import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import { useDeleteBoardMutation } from "../../features/board/boardSlice";
import { useDeleteTaskMutation } from "../../features/task/tasksSlice";
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
  const { boards } = useOutletContext();
  const [deleteBoard, { isLoading }] = useDeleteBoardMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const { active } = useSelector((state) => state.activeBoard);

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
                deleteTask(params.taskTitle);
              } else {
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
