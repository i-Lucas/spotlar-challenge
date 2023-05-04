import React from "react";
import styles from "@/styles/Footer.module.css";
import currencyContext from "@/context/currencyContext";
import { Alert, AlertTitle, Skeleton } from "@mui/material";
import FooterStepper from "../Stepper";

export default function Footer() {

  const { appGlobalContext: globalData } = React.useContext(currencyContext);
  const { status: { loading, error } } = globalData;

  function footerContent() {

    if (loading) {
      return <Skeleton variant="rounded" className={styles.skeleton} />
    };

    if (error) {
      return (
        <div className={styles.footer}>
          <Alert severity="error" variant="outlined" className={styles.alertError}>
            <AlertTitle>Error</AlertTitle>
            sorry, something went wrong. — <strong>please try again</strong> message: {error}
          </Alert>
        </div>
      )
    };

    if (globalData.result?.showResult) {
      const { amount, value } = globalData.result;
      const { from, to } = globalData.currencies;
      return (
        <div>
          <h1>{amount} {from} is {value} {to}</h1>

        </div>
      )
    };
  };

  return (
    <div className={styles.footer}>
      <FooterStepper step={globalData.step} />
    </div>
  )
};