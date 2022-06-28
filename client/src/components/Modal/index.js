import React, { useState } from "react";
import { ClickableOverlay, ScrollOverlay, StyledModal } from "./Styles";

const Modal = ({ Content, isOpen, setIsModalOpen }) => {
  // const [isOpen, setIsOpen] = useState(false);

  const defaultProps = {
    className: undefined,
    testid: "modal",
    variant: "center",
    width: 600,
    withCloseIcon: true,
    isOpen: undefined,
    onClose: () => {},
    renderLink: () => {},
  };
  return (
    <>
      {isOpen && (
        <ScrollOverlay>
          <ClickableOverlay>
            <StyledModal>
              <Content />
              <h3 onClick={() => setIsModalOpen(false)}>Close</h3>
            </StyledModal>
          </ClickableOverlay>
        </ScrollOverlay>
      )}
    </>
  );
};

export default Modal;
