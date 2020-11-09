import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HeaderComponent from '../../components/HeaderComponent';
import SidebarComponent from '../../components/SidebarComponent';

import Clients from '../../pages/Clients';
import ClientDetail from '../../pages/ClientDetail';
import Products from '../../pages/Products';
import ProductDetail from '../../pages/ProductDetail';

import { AppContainer, AppMainContainer } from './styles';

export default function App() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <AppContainer>
      <HeaderComponent onClick={() => setOpenSidebar(true)} />
      <AppMainContainer>
        <SidebarComponent open={openSidebar} setOpen={() => setOpenSidebar(!openSidebar)} />
        <Switch>
          <Route exact path="/app/clients" component={Clients} />
          <Route exact path="/app/client-detail/:clientId" component={ClientDetail} />
          <Route exact path="/app/products" component={Products} />
          <Route exact path="/app/product-detail/:productId" component={ProductDetail} />
          <Redirect from="/app" to="/app/clients" />
        </Switch>
      </AppMainContainer>
    </AppContainer>
  );
}
