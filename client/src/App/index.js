import React, { useEffect, useState } from "react";
import Header from "../shared/components/Header";
import BaseStyles from "./BaseStyles";
import NormalizeStyles from "./NormalizeStyles";

import { ThemeProvider } from "styled-components";
// import { GlobalStyles } from "./components/Globalstyle";
import { lightTheme, darkTheme } from "./Theme";
import RouteHandler from "./Routes";

export const App = () => {
  const [theme, setTheme] = useState("light");

  // console.log(boards);
  const yay = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  // useEffect(() => {}, []);

  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        {/* <NormalizeStyles />*/}
        <BaseStyles />
        <Header yay={yay} theme={theme} />
        <RouteHandler yay={yay} theme={theme} />
        {/* <Header /> */}
      </ThemeProvider>
    </>
  );
};
