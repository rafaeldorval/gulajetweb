import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

import Auth from "../layout/Auth";
import App from "../layout/App";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/auth", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const Routes = () => (
  <Switch>
    <Route path="/auth" component={Auth} />
    <PrivateRoute path="/app" component={App} />
    <Redirect from="/" to="/app" />
  </Switch>
);

export default Routes;
