import React from "react";
import Footer from "@/components/Footer";
import FormComponent from "../components/Form";
import Container from "@/components/Container";
import ChartComponent from "@/components/LineChart/chartComponent";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <Container className={styles.home}>
      <FormComponent />
      <ChartComponent />
      <CalendarComponent />
      <Footer />
    </Container>
  )
};

function CalendarComponent() {
  return (
    <Container style={{ width: "80%", height: "30%", backgroundColor: "red" }}>

    </Container>
  )
};