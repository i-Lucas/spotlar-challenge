import React from "react";
import LineChart from ".";
import Container from "../Container";
import styles from "@/styles/Chart.module.css";
import currencyContext from "@/context/currencyContext";

export default function ChartComponent() {

  const { appGlobalContext: globalData } = React.useContext(currencyContext);
  const { currencies, status } = globalData;

  if (status.loading) {
    return (
      <div>
        <h1>ChartComponent loading spinner here</h1>
      </div>
    )
  };

  if (status.error) {
    return <div>ChartComponent error ....</div>
  };

  if (currencies.from && currencies.to) {
    return (
      <div className={styles.chartContainer}>
        <LineChart currencyPair={{ from: currencies.from, to: currencies.to, color: "red" }} />
        <LineChart currencyPair={{ from: currencies.to, to: currencies.from, color: "green" }} />
      </div>
    )
  };

  return (
    <div className={styles.chartContainer}>
    </div>
  )
};
