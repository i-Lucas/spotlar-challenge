import React from "react";
import FormHtml from "./FormView";
import styles from "@/styles/Form.module.css";
import fetchCurrencies from "@/hooks/useCurrencies";
import currencyContext from "@/context/currencyContext";
import fetchExchangeRate from "@/hooks/fetchExchangeRate";

export default function FormComponent() {

  const fetchedCurrencyData = fetchCurrencies();
  const { appGlobalContext, setAppGlobalContext } = React.useContext(currencyContext);
  const [formData, setFormData] = React.useState<IFormData>({ currentCurrency: { from: "", to: "" } });

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
        }
      });

    } catch (error) {

      console.log(error);
      return (
        <div className={styles.form}>
          <h1>error ... {`${error}`}</h1>
        </div>
      )
    };
  };

  const formHtmlProps = {
    setFormData,
    handleSubmit,
    formData,
    currencies: fetchedCurrencyData.currencies
  };

  if (fetchedCurrencyData.loading) {
    return (
      <div className={styles.form}>
        <h1>loading ... loader spinner here </h1>
      </div>
    )
  };

  return <FormHtml props={formHtmlProps} />
};
