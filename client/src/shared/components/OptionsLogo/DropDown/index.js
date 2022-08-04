import React from "react";
import { useNavigate } from "react-router-dom";
import { DropDownContainer, DropDownOption } from "./Styles";

const DropDown = ({ type, route, deleteRoute, editRoute, setIsOpen }) => {
  const navigate = useNavigate();

  return (
    <DropDownContainer>
      <DropDownOption
        onClick={() => {
          navigate(editRoute);
          setIsOpen(false);
        }}
      >{`Edit ${type}`}</DropDownOption>
      {/* <DropDownOption
        onClick={() => navigate(deleteRoute)}
      >{`Delete ${type}`}</DropDownOption> */}
      <DropDownOption
        onClick={() => {
          navigate(`${deleteRoute}`);
          setIsOpen(false);
        }}
      >{`Delete ${type}`}</DropDownOption>
    </DropDownContainer>
  );
};

export default DropDown;
