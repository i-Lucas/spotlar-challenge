import React from "react";
import { Input, Select } from "./FormControls";

export default function FormHtml({ props }: IFormHtmlProps) {

  const { exchangeData, currencies, resultStatus } = props;
  const { setExchangeData, setResult, handleSubmit } = props;

  const { loading, showResult } = resultStatus;
  const { amount, convertedAmount, currentCurrency } = exchangeData;

  const buttonContent = loading ? "loading..." : "convert";
  const options = [{ label: "Choose", value: "" }, ...generateCurrencyOptions(currencies)];

  const isEmpty = (str: string) => str.length === 0;
  const viewButton = !isEmpty(currentCurrency.from) && !isEmpty(currentCurrency.to) && amount !== 0;

  return (
    <form onChange={() => setResult({ ...resultStatus, showResult: false })} style={formStyle}>

      <Input
        label="Amount:"
        type="number"
        value={amount}
        onChange={(e) => setExchangeData({ ...exchangeData, amount: parseFloat(e.target.value) })} />

      <Select
        label="From:"
        value={currentCurrency.from}
        options={options}
        onChange={(e) => setExchangeData({ ...exchangeData, currentCurrency: { ...currentCurrency, from: e.target.value } })}
      />

      <Select
        label="To:"
        value={currentCurrency.to}
        options={options}
        onChange={(e) => setExchangeData({ ...exchangeData, currentCurrency: { ...currentCurrency, to: e.target.value } })}
      />

      {showResult &&
        renderResult(
          amount,
          currentCurrency.from,
          currentCurrency.to,
          convertedAmount.toFixed(2)
        )
      }

      {viewButton && <button onClick={handleSubmit}>{buttonContent}</button>}
    </form>
  );
};

function renderResult(amount: number, from: string, to: string, result: string) {
  return <p>{amount} {from} is {result} {to}</p>
};

function generateCurrencyOptions(currencies: ICurrency[]) {
  return currencies.map((currency) => ({
    label: `${currency.name} (${currency.code})`,
    value: currency.code,
  }));
};

const formStyle: React.CSSProperties = {
  width: "80%",
  height: "20%",
  margin: "auto",
  backgroundColor: "tomato"
};