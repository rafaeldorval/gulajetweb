import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "../../pages/Login";

const Routes = () => (
  <Switch>
    <Route exact path="/auth/login" component={Login} />
    <Redirect from="/auth" to={"/auth/login"} />
  </Switch>
);

export default function Auth() {
  return <Routes />;
}
