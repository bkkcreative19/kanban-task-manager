import { createGlobalStyle } from "styled-components";

import { color, font, mixin } from "../shared/utils/styles";

export default createGlobalStyle`


*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Plus Jakarta Sans", sans-serif;
  background: ${({ theme }) => theme.headerBG};
  height: 100vh;
}

 `;
