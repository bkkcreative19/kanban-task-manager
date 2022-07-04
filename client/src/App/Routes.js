import React from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import Home from "../Home";
import AddBoard from "../Home/SideBar/AddBoard";
import AddTask from "../Home/SideBar/AddTask";
import TaskDetails from "../Home/TaskDetails";

// import history from "browserHistory";
// import Project from "Project";
// import Authenticate from "Auth/Authenticate";
// import PageError from "shared/components/PageError";

const RouteHandler = ({ yay, theme }) => (
  <Routes>
    <Route path="/home" element={<Home yay={yay} theme={theme} />}>
      <Route path=":taskTitle" element={<TaskDetails />} />
      <Route path="/home/addBoard" element={<AddBoard />} />
      <Route path="/home/addTask" element={<AddTask />} />
    </Route>

    {/* <Route path="/authenticate" component={Authenticate} /> */}
    {/* <Route path="/project" component={Project} /> */}
    {/* <Route component={PageError} /> */}
  </Routes>
);

export default RouteHandler;
