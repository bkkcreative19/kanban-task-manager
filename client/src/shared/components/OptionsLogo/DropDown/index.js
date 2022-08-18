import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DropDownContainer, DropDownOption } from "./Styles";

const DropDown = ({
  type,
  route,
  deleteRoute,
  editRoute,
  setIsOpen,
  isOpen,
}) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isOpen) {
  //     document.addEventListener("click", () => setIsOpen(false));
  //   }
  // }, []);

  return (
    <DropDownContainer>
      <DropDownOption
        onClick={() => {
          navigate(editRoute);
          setIsOpen(false);
        }}
        color="#828FA3;"
      >{`Edit ${type}`}</DropDownOption>
      {/* <DropDownOption
        onClick={() => navigate(deleteRoute)}
      >{`Delete ${type}`}</DropDownOption> */}
      <DropDownOption
        onClick={() => {
          navigate(`${deleteRoute}`);
          setIsOpen(false);
        }}
        color="#EA5555"
      >{`Delete ${type}`}</DropDownOption>
    </DropDownContainer>
  );
};

export default DropDown;
