import React from "react";
import LineChart from ".";
import { Skeleton } from "@mui/material";
import styles from "@/styles/Chart.module.css";
import currencyContext from "@/context/currencyContext";

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
        <div>ChartComponent error ....</div>
      )
    };

    if (currencies.from && currencies.to) {
      return (
        <>
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
