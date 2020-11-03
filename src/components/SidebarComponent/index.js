import React from 'react';
import {Close, AccountCircle, Dashboard} from '@material-ui/icons'
import {Link} from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import { Drawer } from '@material-ui/core';

import {RowContainer, HrComponent} from './styles'
import LogoImage from '../../assets/image/gulajet_simbolo.png'

const styles =  makeStyles((theme) => ({
  sidebar: {
    width: "20%",
    backgroundColor: "#f25822",
  },
}));


export default function SidebarComponent({ open, setOpen }) {
  const classes = styles();
  return (
    <Drawer open={open} anchor="left" onClose={setOpen} classes={{
      paper: classes.sidebar
    }}>
      <RowContainer justifyContent="flex-end">
          <button onClick={setOpen} >
            <Close />
          </button>
        </RowContainer>
      <RowContainer justifyContent="center">
        <img src={LogoImage} alt="logo" style={{
          maxWidth: '25%',
          height: 'auto',
        }}/>
        </RowContainer>
      <RowContainer justifyContent="center">
        <h3>Menu</h3>
      </RowContainer>
      <HrComponent/>
      <RowContainer mt="20px" >
        <Link to="/app/clients" onClick={setOpen}>
          <AccountCircle />
          Clientes
        </Link>
      </RowContainer>
      <RowContainer mt="5px" onClick={setOpen} >
        <Link to="/app/products">
          <Dashboard />
          Produtos
        </Link>
      </RowContainer>
    </Drawer>

  );
}
