import React from "react";
import styles from "@/styles/Container.module.css";

interface HomeContainerProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

export default function Container({ children, style, className }: HomeContainerProps) {
  return (
    <section style={style} className={styles.main}>
      {children}
    </section>
  )
};