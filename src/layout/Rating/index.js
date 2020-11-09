import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RatingProduct from '../../pages/RatingProduct';

const Routes = () => (
  <Switch>
    <Route exact path="/rating/product/:productId" component={RatingProduct} />
    <Redirect from="/rating" to="/rating/product" />
  </Switch>
);

export default function Auth() {
  return <Routes />;
}
