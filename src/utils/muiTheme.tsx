import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00B2EB", // Primary color in hex
    },
    secondary: {
      main: "#FF6D3A", // Secondary color in hex
    },
    error: {
      main: "#FF0000", // Error color in hex
    },
    warning: {
      main: "#FFA500", // Warning color in hex
    },
    info: {
      main: "#4169E1", // Info color in hex
    },
    success: {
      main: "#008000", // Success color in hex
    },
    background: {
      default: "#FFFFFF", // Default background color in hex
      paper: "#F5F5F5", // Paper background color in hex
    },
    text: {
      primary: "#212121", // Primary text color in hex
      secondary: "#00B2EB", // Secondary text color in hex
    },
    common: {
      black: "#000000",
      white: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Proxima Soft",
  },
  spacing: 6,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
