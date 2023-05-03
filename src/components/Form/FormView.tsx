import React from "react";
import styles from "@/styles/Form.module.css";
import { Input, Select } from "./FormControls";
import currencyContext from "@/context/currencyContext";

export default function FormHtml({ props }: IFormHtmlProps) {

  const { appGlobalContext: globalData } = React.useContext(currencyContext);

  const { formData, currencies } = props;
  const { setFormData, handleSubmit } = props;
  const buttonContent = globalData.status.loading ? "loading..." : "convert";

  const isEmpty = (str: string) => str.length === 0;
  const isFromAndToEmpty = isEmpty(formData.currentCurrency.from) || isEmpty(formData.currentCurrency.to);
  const viewButton = !isFromAndToEmpty && formData.amount !== 0 ? true : false;

  function setFromTo(option: "from" | "to", value: string) {
    setFormData({ ...formData, currentCurrency: { ...formData.currentCurrency, [option]: value } })
  };

  function setAmount(amount: string) {
    setFormData({ ...formData, amount: parseFloat(amount) })
  };

  const renderFormProps = {
    formData,
    currencies,
    setFromTo,
    setAmount
  };

  return (
    <form>
      {renderFormContent(renderFormProps)}
      {viewButton && <button onClick={handleSubmit}>{buttonContent}</button>}
    </form>
  );
};

function renderFormContent({ formData, currencies, setAmount, setFromTo }: RenderFormProps) {
  const options = [{ label: "choose", value: "" }, ...generateCurrencyOptions(currencies)];
  return (
    <div>
      <Input
        type="number"
        label="Amount:"
        value={formData.amount ? formData.amount : 0}
        onChange={(e) => setAmount(e.target.value)} />

      <Select
        label="From:"
        options={options}
        value={formData.currentCurrency.from}
        onChange={(e) => setFromTo("from", e.target.value)}
      />

      <Select
        label="To:"
        options={options}
        value={formData.currentCurrency.to}
        onChange={(e) => setFromTo("to", e.target.value)}
      />
    </div>
  )
};

function generateCurrencyOptions(currencies: ICurrency[]) {
  return currencies.map((currency) => ({
    label: `${currency.name} (${currency.code})`,
    value: currency.code,
  }));
};