import { defaultTheme, RaThemeOptions } from "react-admin";
import _ from "lodash";

import { blue, grey } from "@mui/material/colors";

const customTheme: RaThemeOptions = {
  palette: {
    primary: {
      main: blue[900],
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    h1: {
      fontSize: 24,
      fontWeight: 360,
      marginBottom: 16,
    },
    h2: {
      fontSize: 20,
      fontWeight: 320,
      marginBottom: 14,
    },
    h3: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 8,
      textTransform: 'uppercase',
    },
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  breakpoints: {
    values: {
      xs: 415,
      sm: 897,
      md: 1025,
      lg: 1280,
      xl: 1280,
    },
  },
  components: {
    ...defaultTheme.components,
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          // Name of the rule
          backgroundColor: grey[200], // Some CSS
          color: grey[900],
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
};

export default _.merge(defaultTheme, customTheme);
