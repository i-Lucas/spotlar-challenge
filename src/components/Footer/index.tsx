import React from "react";
import styles from "@/styles/Footer.module.css";
import currencyContext from "@/context/currencyContext";

export default function Footer() {

  const { appGlobalContext: globalData } = React.useContext(currencyContext);

  if (globalData.status.loading) {
    return (
      <div>
        <h1>loading spinner here ...</h1>
      </div>
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
    <div className={styles.footer}>
      {footerContent()}
    </div>
  )
};