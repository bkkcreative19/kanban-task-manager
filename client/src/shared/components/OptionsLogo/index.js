import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Ellipsis from "../../../assets/icon-vertical-ellipsis.svg";
import DropDown from "./DropDown";
import { Dots, OptionsLogoContainer } from "./Styles";

const OptionsLogo = ({ editRoute, deleteRoute, type, route }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   if (isOpen) {
  //     document.addEventListener("click", () => setIsOpen(false));
  //   }
  // }, [document]);
  return (
    <OptionsLogoContainer>
      {/* <Dots onClick={() => navigate(`/${route}`)} src={Ellipsis} /> */}
      <Dots onClick={() => setIsOpen(!isOpen)} src={Ellipsis} />
      {isOpen && (
        <DropDown
          editRoute={editRoute}
          deleteRoute={deleteRoute}
          route={route}
          type={type}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      )}
    </OptionsLogoContainer>
  );
};

export default OptionsLogo;
