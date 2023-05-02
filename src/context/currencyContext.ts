import React from "react";

interface CurrencyContextValue {
  appGlobalContext: IAppCurrencyContext;
  setAppGlobalContext: React.Dispatch<React.SetStateAction<IAppCurrencyContext>>;
};

const currencyContext = React.createContext<CurrencyContextValue>({
  appGlobalContext: {
    currencies: { from: undefined, to: undefined },
    status: { loading: false }
  },
  setAppGlobalContext: () => { },
});

export default currencyContext;