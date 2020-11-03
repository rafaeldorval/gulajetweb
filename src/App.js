import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { positions, Provider as ProviderAlert } from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";

import theme from "./styles/theme";
import { CustomTheme } from "./styles/global";
import Routes from "./routes";

import "./config/reactotron";
import store from "./store";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const options = {
    position: positions.MIDDLE,
  };
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CustomTheme />
          <ProviderAlert template={AlertMUITemplate} {...options}>
            <Routes />
          </ProviderAlert>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
