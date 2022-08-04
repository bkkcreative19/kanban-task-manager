import React from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import Home from "../Home";
import EditBoard from "../Home/EditBoard";
import AddBoard from "../Home/SideBar/AddBoard";
import AddTask from "../Home/AddTask";
import TaskDetails from "../Home/TaskDetails";
import EditTask from "../Home/TaskDetails/EditTask";

// import history from "browserHistory";
// import Project from "Project";
// import Authenticate from "Auth/Authenticate";
// import PageError from "shared/components/PageError";

const RouteHandler = ({ yay, theme }) => (
  <Routes>
    <Route path="/" element={<Home yay={yay} theme={theme} />}>
      <Route path=":taskTitle" element={<TaskDetails />} />
      <Route path="/addBoard" element={<AddBoard />} />
      <Route path="/editBoard" element={<EditBoard />} />
      <Route path="/addTask" element={<AddTask />} />
      <Route path="editTask/:taskTitle" element={<EditTask />} />
    </Route>

    {/* <Route path="/authenticate" component={Authenticate} /> */}
    {/* <Route path="/project" component={Project} /> */}
    {/* <Route component={PageError} /> */}
  </Routes>
);

export default RouteHandler;
