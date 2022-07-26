import React, { useEffect } from "react";

export default function useIsActive(num) {
  const [active, setActive] = React.useState(num);

  //   function handleCopy(text) {
  //     if (typeof text === "string" || typeof text == "number") {
  //       // copy
  //     } else {
  //       // don't copy
  //       console.error(
  //         `Cannot copy typeof ${typeof text} to clipboard, must be a string or number.`
  //       );
  //     }
  //   }
  //   if (num) {
  //     setActive(num);
  //   }

  return [active, setActive];
}
