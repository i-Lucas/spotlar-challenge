import React from "react";
import styles from "@/styles/Container.module.css";

interface HomeContainerProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

export default function Container({ children, style }: HomeContainerProps) {
  return (
    <section style={style} className={styles.main}>
      {children}
    </section>
  )
};