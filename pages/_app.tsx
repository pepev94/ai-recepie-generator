import { AppProps } from "next/app";
import "../styles/globals.css";
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import Spanish from "../content/locales/es.json";
import English from "../content/locales/en.json";
import NavBar from "@/components/navBar";
import { ThemeProvider } from "@emotion/react";
import { MuiTheme } from "@/utils/theme";
import { CssBaseline } from "@mui/material";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LanguageMenu from "@/components/LanguageMenu";

const App = ({ Component, pageProps }: AppProps) => {
  const { locale } = useRouter();
  let [shortLocale] = locale ? locale.split("-") : ["en"];
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const queryClient = new QueryClient();

  const messages = useMemo(() => {
    if (selectedLanguage !== "") {
      switch (selectedLanguage) {
        case "es":
          return Spanish;
        case "en":
          return English;
      }
    }
    switch (shortLocale) {
      case "es":
        return Spanish;
      case "en":
        return English;
    }
  }, [shortLocale, selectedLanguage]);

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-9RQ9TBFXW6"
        strategy="afterInteractive"
      />
      <Script id="hot-jar" strategy="afterInteractive">
        {`
           (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3377353,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
      </Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-9RQ9TBFXW6');
        `}
      </Script>
      <Script id="twak.to" strategy="afterInteractive">
        {`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/63efecbb4247f20fefe13470/1gpgj9fu8';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
          })();
        `}
      </Script>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={pageProps.session}>
          <IntlProvider
            locale={selectedLanguage !== "" ? selectedLanguage : shortLocale}
            messages={messages}
            onError={() => null}
          >
            <ThemeProvider theme={MuiTheme}>
              <CssBaseline />
              <NavBar />
              <LanguageMenu setSelectedLanguage={setSelectedLanguage} />
              <Component {...pageProps} />
            </ThemeProvider>
          </IntlProvider>
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
};
export default App;
