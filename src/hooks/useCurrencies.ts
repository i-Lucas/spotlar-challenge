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

  const excludedCurrencies = ["bake"];
  const filteredCurrencies = currencies.currencies.filter((currency) => {
    return !excludedCurrencies.some((string) => currency.code.toLowerCase().includes(string.toLowerCase()));
  });

  return {
    currencies: filteredCurrencies,
    loading: currencies.loading,
    error: currencies.error
  };
};