import React, { useState } from "react";
import { Circle, Slider, ThemeImage, Toggle } from "./Styles";
import Sun from "../../../assets/icon-light-theme.svg";
import Moon from "../../../assets/icon-dark-theme.svg";

const ThemeToggle = ({ yay, theme }) => {
  const [isLight, setIsLight] = useState(false);

  const handleClick = () => {
    setIsLight(!isLight);
    console.log(isLight);
  };
  return (
    <Toggle>
      <ThemeImage src={Sun} />
      <Slider onClick={yay}>
        <Circle theme={theme}></Circle>
      </Slider>
      <ThemeImage src={Moon} />
    </Toggle>
  );
};

export default ThemeToggle;
