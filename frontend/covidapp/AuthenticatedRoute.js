/* authenticated router */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import UserServiceApi from "./api/UserServiceApi";

function AuthenticatedRoute(props) {
  if (UserServiceApi.isUserLoggedIn()) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/" />;
  }
}

export default AuthenticatedRoute;
