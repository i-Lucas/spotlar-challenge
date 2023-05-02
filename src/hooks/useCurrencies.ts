import React from "react";

interface Status {
  currencies: ICurrency[];
  loading: boolean;
  error?: string;
};

export default function fetchCurrencies() {

  const initialStatus: Status = {
    currencies: [],
    loading: true
  };

  const [currencies, setCurrencies] = React.useState<Status>(initialStatus);
  const apiUrl = process.env.API_URL + "@1/latest/currencies.min.json";

  React.useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json()).then((data) => {
        const mapCurrencies = Object.keys(data).map((code) => ({ code, name: data[code] }));
        setCurrencies({ currencies: mapCurrencies, loading: false });
      });

  }, [currencies.loading]);

  return currencies;
};

