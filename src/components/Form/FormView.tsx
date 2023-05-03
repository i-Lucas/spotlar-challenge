import React from "react";
import ButtonComponent from "../Button";
import styles from "@/styles/Form.module.css";
import currencyContext from "@/context/currencyContext";
import { Select, MenuItem, TextField } from "@mui/material";

export default function FormHtml({ props }: IFormHtmlProps) {

  const { appGlobalContext: globalData } = React.useContext(currencyContext);
  const [initialFormData, setInitialFormData] = React.useState(globalData);
  React.useEffect(() => setInitialFormData(globalData), [globalData]);

  const { formData, currencies } = props;
  const { setFormData, handleSubmit } = props;
  const selectCurrencyList = buildMenuItems(currencies);

  const isEmpty = (str: string) => str.length === 0;
  const isFromAndToEmpty = isEmpty(formData.currentCurrency.from) || isEmpty(formData.currentCurrency.to);
  const viewButton = !isFromAndToEmpty && formData.amount !== null ? true : false;

  function setFromTo(option: "from" | "to", value: string) {
    setFormData({ ...formData, currentCurrency: { ...formData.currentCurrency, [option]: value } });
  };

  function setAmount(event: React.ChangeEvent<HTMLInputElement>) {
    const numberValue = parseInt(event.target.value.replace(/[\D]+/g, '')) / 100;
    setFormData({ ...formData, amount: numberValue });
  };

  function isFormChanged(): boolean {
    return initialFormData.result?.amount !== formData.amount ||
      initialFormData.currencies.from !== formData.currentCurrency.from ||
      initialFormData.currencies.to !== formData.currentCurrency.to;
  };

  function onlyNumbers(event: React.KeyboardEvent<HTMLDivElement>): boolean | void {
    return !/[0-9]/.test(event.key) && event.preventDefault()
  };

  return (
    <form className={styles.form}>
      <TextField
        label="Amount"
        size="small"
        value={formData.amount !== null ? formatCurrency(formData.amount) : ''}
        onChange={setAmount}
        onKeyPress={onlyNumbers}
        InputLabelProps={{ shrink: true }}
      />

      <Select
        label="From:"
        size="small"
        value={formData.currentCurrency.from}
        onChange={(e) => setFromTo("from", e.target.value)}
        displayEmpty
      >
        <MenuItem value="" disabled>From</MenuItem>
        {selectCurrencyList}
      </Select>

      <Select
        label="To:"
        size="small"
        value={formData.currentCurrency.to}
        onChange={(e) => setFromTo("to", e.target.value)}
        displayEmpty
      >
        <MenuItem value="" disabled>To</MenuItem>
        {selectCurrencyList}
      </Select>

      {viewButton &&
        <ButtonComponent
          content={"convert"}
          loading={globalData.status.loading}
          onClick={handleSubmit}
          disabled={!isFormChanged()}
        />}
    </form >
  );
};

function buildMenuItems(currencies: ICurrency[]) {
  return currencies.map((currency) => (
    <MenuItem key={currency.code} value={currency.code}>
      {`${currency.name} (${currency.code})`}
    </MenuItem>
  ));
};

function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol'
  });
};