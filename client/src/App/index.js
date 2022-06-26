import React, { useState } from "react";
import Header from "../components/Header";
import BaseStyles from "./BaseStyles";
import NormalizeStyles from "./NormalizeStyles";

import { ThemeProvider } from "styled-components";
// import { GlobalStyles } from "./components/Globalstyle";
import { lightTheme, darkTheme } from "./Theme";

export const App = () => {
  const [theme, setTheme] = useState("light");

  const yay = () => {
    console.log(theme);
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        {/* <NormalizeStyles />*/}
        <BaseStyles />
        <Header />
        <button onClick={yay}>Click</button>
        <h1>hi</h1>
        {/* <Header /> */}
      </ThemeProvider>
    </>
  );
};
