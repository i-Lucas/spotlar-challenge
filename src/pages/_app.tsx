import React from "react";
import "@/styles/reset.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import currencyContext from "@/context/currencyContext";

export default function App({ Component, pageProps }: AppProps) {

  const [appGlobalContext, setAppGlobalContext] = React.useState<IAppCurrencyContext>({
    currencies: { from: undefined, to: undefined }, status: { loading: false }
  });

  return (
    <currencyContext.Provider value={{ appGlobalContext, setAppGlobalContext }} >
      <Component {...pageProps} />
    </currencyContext.Provider>
  )
};