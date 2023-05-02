import React from "react";
import FormHtml from "./FormView";
import fetchCurrencies from "@/hooks/useCurrencies";
import fetchExchangeRate from "@/hooks/fetchExchangeRate";

export default function FormComponent() {

  const { currencies, loading, error } = fetchCurrencies();
  const [exchangeData, setExchangeData] = React.useState<IExchangeData>({
    currentCurrency: { from: "", to: "" },
    amount: 0,
    convertedAmount: 0
  });

  const { amount, currentCurrency } = exchangeData;

  const [resultStatus, setResult] = React.useState<IAwaitResults>({
    showResult: false,
    loading: false
  });

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    setResult({ ...resultStatus, loading: true });

    try {
      const exchangeRate = await fetchExchangeRate(currentCurrency.from, currentCurrency.to);
      const convertedAmount = amount * exchangeRate.rate;

      setExchangeData({
        ...exchangeData,
        exchangeRate,
        convertedAmount
      });

      setResult({
        showResult: true,
        loading: false
      });

    } catch (error) {

      console.log(error);
      return <div>error ...</div>;
    }
  };

  if (loading) {
    return <div>loading ...</div>;
  };

  if (error) {
    return <div>error ...</div>;
  };

  const formHtmlProps = {
    setExchangeData,
    setResult,
    handleSubmit,
    exchangeData,
    currencies,
    resultStatus
  };

  return <FormHtml props={formHtmlProps} />
};
