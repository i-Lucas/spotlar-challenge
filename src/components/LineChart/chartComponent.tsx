import React from "react";
import LineChart from ".";
import styles from "@/styles/Chart.module.css";
import currencyContext from "@/context/currencyContext";
import { Alert, AlertTitle, Skeleton } from "@mui/material";
import ModalResult from "../Modal";

export default function ChartComponent() {

  const { appGlobalContext: globalData } = React.useContext(currencyContext);
  const { currencies, status } = globalData;

  function renderCharts() {

    if (status.loading) {
      return (
        <div className={styles.skeletonDiv}>
          <Skeleton
            variant="rounded"
            className={styles.skeleton}
          />
          <span className={styles.skeletonSpan} />
          <Skeleton
            variant="rounded"
            className={styles.skeleton}
          />
        </div>
      )
    };

    if (status.error) {
      return (
        <div>
          <Alert severity="error" variant="outlined" className={styles.alertError}>
            <AlertTitle>Error</AlertTitle>
            sorry, something went wrong. — <strong>please try again</strong>
            <br />
            message: {status.error}
          </Alert>
        </div>
      )
    };

    if (currencies.from && currencies.to) {
      return (
        <>
          <ModalResult />
          <LineChart currencyPair={{ from: currencies.from, to: currencies.to, color: "red" }} />
          <LineChart currencyPair={{ from: currencies.to, to: currencies.from, color: "green" }} />
        </>
      )
    };
  };

  return (
    <div className={styles.chartContainer}>
      {renderCharts()}
    </div>
  )
};
