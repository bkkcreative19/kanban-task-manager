import React from "react";
import { useNavigate } from "react-router-dom";
import Ellipsis from "../../../assets/icon-vertical-ellipsis.svg";
import { Dots } from "./Styles";

const OptionsLogo = ({ route }) => {
  const navigate = useNavigate();
  return <Dots onClick={() => navigate(`/${route}`)} src={Ellipsis} />;
};

export default OptionsLogo;
