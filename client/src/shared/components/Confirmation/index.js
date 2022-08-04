import React from "react";
import { useNavigate } from "react-router-dom";
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
  return (
    <Modal
      isOpen={true}
      width={480}
      withCloseIcon={false}
      onClose={() => navigate("/")}
    >
      <Confirm>
        <ConfirmHead>Delete this Board?</ConfirmHead>
        <ConfirmText>
          Are you sure you want to delete the ‘Platform Launch’ board? This
          action will remove all columns and tasks and cannot be reversed.
        </ConfirmText>
        <ConfirmButtons>
          <ConfirmDelete>Delete</ConfirmDelete>
          <ConfirmCancel>Cancel</ConfirmCancel>
        </ConfirmButtons>
      </Confirm>
    </Modal>
  );
};

export default Confirmation;
