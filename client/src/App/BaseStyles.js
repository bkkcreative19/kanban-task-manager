import { createGlobalStyle } from "styled-components";

import { color, font, mixin } from "../shared/utils/styles";

export default createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700&family=Poppins:wght@600&display=swap");

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
}

 `;
