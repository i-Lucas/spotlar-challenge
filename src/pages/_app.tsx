import React from "react";
import "@/styles/reset.css";
import type { AppProps } from "next/app";
import currencyContext from "@/context/currencyContext";

export default function App({ Component, pageProps }: AppProps) {

  const initialAppState: IAppCurrencyContext = {
    currencies: {
      from: undefined,
      to: undefined
    },
    status: {
      loading: false
    },
    step: -1
  };

  const [appGlobalContext, setAppGlobalContext] = React.useState<IAppCurrencyContext>(initialAppState);

  return (
    <currencyContext.Provider value={{ appGlobalContext, setAppGlobalContext }} >
      <Component {...pageProps} />
    </currencyContext.Provider>
  )
};