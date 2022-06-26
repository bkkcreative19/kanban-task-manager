import React from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import Home from "../Home";

// import history from "browserHistory";
// import Project from "Project";
// import Authenticate from "Auth/Authenticate";
// import PageError from "shared/components/PageError";

const RouteHandler = ({ yay, theme }) => (
  <Routes>
    <Route path="/" element={<Home yay={yay} theme={theme} />} />
    {/* <Route path="/authenticate" component={Authenticate} /> */}
    {/* <Route path="/project" component={Project} /> */}
    {/* <Route component={PageError} /> */}
  </Routes>
);

export default RouteHandler;
