import React from "react";
import Footer from "@/components/Footer";
import FormComponent from "../components/Form";
import LineChart from "@/components/LineChart";
import Container from "@/components/Container";

export default function Home() {
  return (
    <Container>
      <FormComponent />
      <LineChart currencyPair={{ from: "usd", to: "brl", color: "red" }} />
      <LineChart currencyPair={{ from: "brl", to: "usd", color: "green" }} />
      <Footer />
    </Container>
  )
};