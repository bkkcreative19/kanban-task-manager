import React from "react";
import Select from "../../../shared/components/Select";
import { Status, StatusTitle } from "./Styles";

const CurrentStatus = ({ currentStatus, setCurrentStatus }) => {
  return (
    <Status>
      <StatusTitle>Current Status</StatusTitle>
      <Select
        selected={currentStatus}
        setSelected={setCurrentStatus}
        options={["Todo", "Doing", "Done"]}
      />
    </Status>
  );
};

export default CurrentStatus;
