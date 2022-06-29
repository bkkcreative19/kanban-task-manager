import React, { useState, useCallback, useRef, useEffect } from "react";
import { ClickableOverlay, ScrollOverlay, StyledModal } from "./Styles";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  testid: PropTypes.string,
  variant: PropTypes.oneOf(["center", "aside"]),
  width: PropTypes.number,
  withCloseIcon: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  renderLink: PropTypes.func,
};

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

const Modal = (props) => {
  const {
    width,
    withCloseIcon,
    variant,
    isOpen: propsIsOpen,
    onClose: tellParentToClose,
    renderLink,
  } = props;
  const [stateIsOpen, setStateOpen] = useState(false);
  const isControlled = typeof propsIsOpen === "boolean";
  const isOpen = isControlled ? propsIsOpen : stateIsOpen;

  const $modalRef = useRef();
  const $clickableOverlayRef = useRef();

  const closeModal = useCallback(() => {
    if (!isControlled) {
      setStateOpen(false);
    } else {
      tellParentToClose();
    }
  }, [isControlled, tellParentToClose]);

  // useEffect(() => {
  //   document.body.style.overflow = "hidden";

  //   return () => {
  //     document.body.style.overflow = "visible";
  //   };
  // }, [isOpen]);

  return (
    <>
      {!isControlled && renderLink({ open: () => setStateOpen(true) })}

      {isOpen &&
        ReactDOM.createPortal(
          <ScrollOverlay>
            <ClickableOverlay variant={variant} ref={$clickableOverlayRef}>
              <StyledModal variant={variant} width={width} ref={$modalRef}>
                {/* <Content /> */}
                {props.children(closeModal)}
                {/* {withCloseIcon && (
                  <CloseIcon
                    type="close"
                    variant={variant}
                    onClick={closeModal}
                  />
                )} */}
                {/* {Content({ close: closeModal })} */}
              </StyledModal>
            </ClickableOverlay>
          </ScrollOverlay>,
          $root
        )}
    </>
  );
};
const $root = document.getElementById("root");

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
