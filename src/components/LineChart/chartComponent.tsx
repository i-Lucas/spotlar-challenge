import React from "react";
import LineChart from ".";
import styles from "@/styles/Chart.module.css";
import currencyContext from "@/context/currencyContext";

export default function ChartComponent() {

  const { appGlobalContext } = React.useContext(currencyContext);
  const { currencies, status } = appGlobalContext;

  if (status.loading) {
    return (
      <div className={styles.wellcome}>
        <h1>ChartComponent loading spinner here</h1>
      </div>
    )
  };

  if (status.error) {
    return <div>ChartComponent error ....</div>
  }

  if (currencies.from && currencies.to) {
    return (
      <section className={styles.section}>
        <LineChart currencyPair={{ from: currencies.from, to: currencies.to, color: "red" }} />
        <LineChart currencyPair={{ from: currencies.to, to: currencies.from, color: "green" }} />
      </section>
    )
  };

  return (
    <div className={styles.wellcome}>
      <h1>bem vindo</h1>
    </div>
  )
};