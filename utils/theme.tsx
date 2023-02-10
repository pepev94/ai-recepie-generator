import { colord } from "colord";
import { createTheme } from "@mui/material/styles";

const primaryMain = colord("#005D8F");
const secondaryMain = colord("#049F55");

// this typography/color palette can be accessed directly
// by any mui component
export const MuiTheme = createTheme({
  //  Color
  palette: {
    text: {
      primary: colord("#000").alpha(0.87).toHex(),
      secondary: colord("#000").alpha(0.6).toHex(),
    },
    primary: {
      main: primaryMain.toHex(),

      dark: colord("#0083CC").toHex(),
    },
    secondary: {
      main: secondaryMain.toHex(),
    },
    grey: {
      "50": colord("#757575").toHex(),
    },
    warning: {
      main: colord("#F7BE16").toHex(),
    },
  },

  typography: {
    button: {
      textTransform: "none",
    },
    h1: {
      fontWeight: "500",
      fontSize: "3rem",
      lineHeight: 1.18,
    },
    h2: {
      fontWeight: "500",
      fontSize: "2rem",
      lineHeight: 1.188,
    },
    h3: {
      fontSize: "1.6875rem",
      lineHeight: "1.875rem",
      fontWeight: "500",
    },
    h4: {
      fontSize: "1.375rem",
      lineHeight: "1.44",
      fontWeight: "500",
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: 500,
      lineHeight: "1.3",
    },
    h6: {
      fontSize: "1rem",
      lineHeight: "1.3",
    },
    caption: {
      lineHeight: "1.125rem",
    },
    overline: { fontSize: ".75rem", lineHeight: 1.6, letterSpacing: "1px" },
    body1: { fontSize: "1.125rem", lineHeight: 1.39 },
    body2: { fontSize: "1rem", lineHeight: 1.4 },
  },
});
