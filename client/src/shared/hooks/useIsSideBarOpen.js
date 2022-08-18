import React, { useEffect, useState } from "react";

export default function useIsSidebar(num) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleChange = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

  return [isSidebarOpen, handleChange];
}
