// src/theme/index.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8344DD",
    },
    secondary: {
      main: "#FF52BF",
    },
    success: {
      main: "#FFD200",
    },
    error: {
      main: "#FF4C60",
    },
    background: {
      default: "#412241",
      second: "#2d1630"
    },
    text: {
      primary: "#ffffff",
      secondary: "#9E9E9E",
    },
  },
  typography: {
    fontFamily: `"Poppins", "Roboto", "Arial", sans-serif`,
  },
});

export default theme;
