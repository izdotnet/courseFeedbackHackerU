import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#ffb703",
    },
  },
  typography: {
    fontFamily: `"Montserrat","Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});
