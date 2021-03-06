import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../../pages/Login';
import RatingProduct from '../../pages/RatingProduct';

const Routes = () => (
  <Switch>
    <Route exact path="/auth/login" component={Login} />
    <Route exact path="/rating-product/:productId" component={RatingProduct} />
    <Redirect from="/auth" to="/auth/login" />
  </Switch>
);

export default function Auth() {
  return <Routes />;
}
