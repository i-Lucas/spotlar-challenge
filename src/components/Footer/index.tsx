import React from "react";
import styles from "@/styles/Footer.module.css";
import currencyContext from "@/context/currencyContext";
import Container from "../Container";

export default function Footer() {

  const { appGlobalContext: globalData } = React.useContext(currencyContext);

  if (globalData.status.loading) {
    return (
      <footer className={styles.footer}>
        <h1>loading spinner here ...</h1>
      </footer>
    )
  };

  function footerContent() {
    if (globalData.result?.showResult) {
      const { amount, value } = globalData.result;
      const { from, to } = globalData.currencies;
      return <h1>{amount} {from} is {value} {to}</h1>
    }
  };

  return (
    <Container className={styles.footer}>
      {footerContent()}
    </Container>
  )
};