import React from "react";
import { Skeleton } from "@mui/material";
import styles from "@/styles/Footer.module.css";
import currencyContext from "@/context/currencyContext";

export default function Footer() {

  const { appGlobalContext: globalData } = React.useContext(currencyContext);
  const { status: { loading } } = globalData;

  function footerContent() {

    if (loading) {
      return <Skeleton variant="rounded" className={styles.skeleton} />
    };

    if (globalData.result?.showResult) {
      const { amount, value } = globalData.result;
      const { from, to } = globalData.currencies;
      return <h1>{amount} {from} is {value} {to}</h1>
    };
  };

  return (
    <div className={styles.footer}>
      {footerContent()}
    </div>
  )
};