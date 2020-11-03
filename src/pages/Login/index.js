/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Grid, TextField, Typography } from "@material-ui/core";

import api from "../../services/api";
import styles from "./styles";
import UserActions from "../../store/ducks/user";
import { login, USERDATA_KEY } from "../../services/auth";

import LogoImage from '../../assets/image/logobrancotransparent.png'

export default function Login(props) {
  const classes = styles();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  async function handleLoggin() {
    try {
      const { data } = await api.post("/sessions", userData);
      console.log(data)

      if(data.user.status !== "actived") {
        return toast.error("Conta de usario não esta ativa");
      }

      if(!data.user.employee) {
        return toast.error("A conta informada não tem acesso para esse login");
      }
      login(data.token);
      props.history.push("/app");
      sessionStorage.setItem(USERDATA_KEY, JSON.stringify(data.user));
      dispatch(UserActions.setUserData(data.user));
      dispatch(UserActions.loadingFalse());
      return toast.success("Login realizado com sucesso");
    } catch (error) {
      console.log(error);
      return toast.error("Usuario ou senha não estão correto");
    }
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <img src={LogoImage} alt="logo" style={{
        maxWidth: '10%',
        height: 'auto',
        marginBottom: 25
      }}/>
      <Grid
        container
        item
        md={3}
        sm={10}
        direction="column"
        className={classes.loginContainer}
        alignItems="center"
        justify="center"
      >
        <Typography color="primary" variant="h5">
          Login
        </Typography>
        <TextField
          id="outlined-basic"
          label="Usuario"
          fullWidth
          type="text"
          variant="outlined"
          value={userData.email}
          onChange={(event) =>
            setUserData({ ...userData, email: event.target.value })
          }
          style={{ margin: "20px 0" }}
        />
        <TextField
          id="outlined-basic"
          label="Senha"
          fullWidth
          value={userData.password}
          onChange={(event) =>
            setUserData({ ...userData, password: event.target.value })
          }
          type="password"
          variant="outlined"
        />
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: 25 }}
          onClick={() => handleLoggin()}
        >
          Entrar
        </Button>
      </Grid>
    </Grid>
  );
}
