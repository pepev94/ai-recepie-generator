import { AppProps } from "next/app";
import "../styles/globals.css";
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";
import { useMemo } from "react";
import Spanish from "../content/locales/es.json";
import English from "../content/locales/en.json";
import NavBar from "@/components/navBar";
import { ThemeProvider } from "@emotion/react";
import { MuiTheme } from "@/utils/theme";
import { CssBaseline } from "@mui/material";
import Script from "next/script";

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  const { locale } = useRouter();
  const [shortLocale] = locale ? locale.split("-") : ["en"];

  const messages = useMemo(() => {
    switch (shortLocale) {
      case "es":
        return Spanish;
      case "en":
        return English;
    }
  }, [shortLocale]);

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-9RQ9TBFXW6"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-9RQ9TBFXW6');
        `}
      </Script>

      <IntlProvider
        locale={shortLocale}
        messages={messages}
        onError={() => null}
      >
        <ThemeProvider theme={MuiTheme}>
          <CssBaseline />

          <NavBar></NavBar>
          <Component {...pageProps} />
        </ThemeProvider>
      </IntlProvider>
    </>
  );
};
export default App;
