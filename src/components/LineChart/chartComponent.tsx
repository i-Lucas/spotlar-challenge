import React from "react";
import LineChart from ".";
import styles from "@/styles/Chart.module.css";
import currencyContext from "@/context/currencyContext";
import Container from "../Container";

export default function ChartComponent() {

  const { appGlobalContext: globalData } = React.useContext(currencyContext);
  const { currencies, status } = globalData;

  if (status.loading) {
    return (
      <div className={styles.wellcome}>
        <h1>ChartComponent loading spinner here</h1>
      </div>
    )
  };

  if (status.error) {
    return <div>ChartComponent error ....</div>
  };

  if (currencies.from && currencies.to) {
    return (
      <Container className={styles.chartComponent}>
        <LineChart currencyPair={{ from: currencies.from, to: currencies.to, color: "red" }} />
        <LineChart currencyPair={{ from: currencies.to, to: currencies.from, color: "green" }} />
      </Container>
    )
  };

  return (
    <Container style={{ width: "80%", height: "40%", display: "flex" }}>
      <h1>Bem vindo</h1>
    </Container>
  )
};