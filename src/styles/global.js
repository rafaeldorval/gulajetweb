import { createGlobalStyle } from "styled-components";

export const CustomTheme = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html, body, #root {
    height: 100vh;
    &::-webkit-scrollbar {
      display: none !important;
    }
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 15px;
      height: 15px;
      border: 1px solid black;
    }
  }
  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    background: #FFF;
    font-family: "Montserrat", sans-serif;
    color: black;
    overflow-x: hidden !important;
    text-decoration: none;
    &:visited {
      text-decoration: none;
    }
  }
  button {
    cursor: pointer;
  }
`;
