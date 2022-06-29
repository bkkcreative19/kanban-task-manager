import React from "react";
import Select from "../../../shared/components/Select";
import { Status, StatusTitle } from "./Styles";

const CurrentStatus = () => {
  return (
    <Status>
      <StatusTitle>Current Status</StatusTitle>
      <Select options={["Todo", "Doing", "Done"]} />
    </Status>
  );
};

export default CurrentStatus;
