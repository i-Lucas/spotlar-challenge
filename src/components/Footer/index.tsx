import React from "react";
import FooterStepper from "../Stepper";
import styles from "@/styles/Footer.module.css";
import currencyContext from "@/context/currencyContext";
import { Alert, AlertTitle, Skeleton } from "@mui/material";

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

    return <FooterStepper step={globalData.step} />
  };

  return (
    <div className={styles.footer}>
      {footerContent()}
    </div>
  )
};