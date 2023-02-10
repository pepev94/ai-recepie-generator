import { AppProps } from "next/app";
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";
import { useMemo } from "react";
import Spanish from "../content/locales/es.json";
import English from "../content/locales/en.json";

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
    <IntlProvider locale={shortLocale} messages={messages} onError={() => null}>
      <Component {...pageProps} />
    </IntlProvider>
  );
};
export default App;
