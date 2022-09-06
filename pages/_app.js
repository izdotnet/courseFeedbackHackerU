import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { theme } from "../utils/theme";
import "../styles/globals.css";
import Head from "next/head";
import AppBar from "../components/AppBar";
import PageFooter from "../components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');
        </style>

        <title>Course Feedback</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <AppBar />
        <Component {...pageProps} />
        <PageFooter />
      </ThemeProvider>
    </>
  );
}
