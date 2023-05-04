import React from "react";
import ButtonComponent from "../Button";
import styles from "@/styles/Form.module.css";
import currencyContext from "@/context/currencyContext";
import { Select, MenuItem, TextField } from "@mui/material";
import ComboBox from "./ComboBox";

export default function FormHtml({ props }: IFormHtmlProps) {

  const { appGlobalContext: globalData } = React.useContext(currencyContext);
  const [initialFormData, setInitialFormData] = React.useState(globalData);
  React.useEffect(() => setInitialFormData(globalData), [globalData]);

  const { formData, currencies } = props;
  const { setFormData, handleSubmit } = props;

  const isEmpty = (str: string) => str.length === 0;
  const isFromAndToEmpty = isEmpty(formData.currentCurrency.from) || isEmpty(formData.currentCurrency.to);
  const textFieldError = formData.currentCurrency.from && formData.currentCurrency.to && !formData.amount ? true : false;
  const viewButton = !textFieldError && !isFromAndToEmpty && formData.amount !== null ? true : false;

  function setFromTo(option: "from" | "to", value: string) {
    setFormData({
      ...formData,
      currentCurrency: {
        ...formData.currentCurrency, [option]: value
      }
    });
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
        size="small"
        onChange={setAmount}
        error={textFieldError}
        onKeyPress={onlyNumbers}
        InputLabelProps={{ shrink: true }}
        label={textFieldError ? "Error" : "Amount"}
        helperText={textFieldError && "put something here ( $1.00 )"}
        value={formData.amount !== null ? formatCurrency(formData.amount) : ""}
      />

      <ComboBox options={currencies} label="From" setFromTo={setFromTo} />
      <ComboBox options={currencies} label="To" setFromTo={setFromTo} />

      {viewButton &&
        <ButtonComponent
          content={"convert"}
          onClick={handleSubmit}
          disabled={!isFormChanged()}
          loading={globalData.status.loading}
        />}
    </form >
  );
};

function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', {
    currency: 'USD',
    style: 'currency',
    currencyDisplay: 'symbol'
  });
};