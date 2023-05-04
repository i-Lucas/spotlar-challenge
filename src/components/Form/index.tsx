import React from "react";
import FormHtml from "./FormView";
import styles from "@/styles/Form.module.css";
import fetchCurrencies from "@/hooks/useCurrencies";
import currencyContext from "@/context/currencyContext";
import fetchExchangeRate from "@/hooks/fetchExchangeRate";
import { Alert, AlertTitle, Skeleton } from "@mui/material";

export default function FormComponent() {

  const fetchedCurrencyData = fetchCurrencies();
  const { appGlobalContext, setAppGlobalContext } = React.useContext(currencyContext);
  const [formData, setFormData] = React.useState<IFormData>({ currentCurrency: { from: "", to: "" }, amount: null });
  const { loading, error } = fetchedCurrencyData;

  async function handleSubmit(e: HandleSubmitType) {
    e.preventDefault();

    try {

      if (!formData.amount) return;
      setAppGlobalContext({ ...appGlobalContext, status: { loading: true } });
      const exchangeRate = await fetchExchangeRate(formData.currentCurrency.from, formData.currentCurrency.to);

      setFormData({ ...formData, exchangeRate });
      setAppGlobalContext({
        ...appGlobalContext,
        status: { loading: false },
        currencies: {
          from: formData.currentCurrency.from,
          to: formData.currentCurrency.to
        },
        result: {
          showResult: true,
          amount: formData.amount,
          value: (formData.amount * exchangeRate.rate).toFixed(2),
        },
        step: 2
      });

    } catch (error) {
      console.log(error);
      setAppGlobalContext({ ...appGlobalContext, status: { loading: false, error: `${error}` } })
    };
  };

  const formHtmlProps = {
    setFormData,
    handleSubmit,
    formData,
    currencies: fetchedCurrencyData.currencies
  };

  function renderForm() {

    if (loading) {
      return <Skeleton variant="rounded" className={styles.skeleton} />
    };

    if (error) {
      return (
        <div className={styles.formContainer}>
          <Alert severity="error" variant="outlined" className={styles.alertError}>
            <AlertTitle>Error</AlertTitle>
            sorry, something went wrong. — <strong>please try again</strong>
            <br />
            message: {error}
          </Alert>
        </div>
      )
    };

    return <FormHtml props={formHtmlProps} />;
  };

  return (
    <div className={styles.formContainer}>
      {renderForm()}
    </div>
  )
};