import React from "react";
import Footer from "@/components/Footer";
import FormComponent from "../components/Form";
import Container from "@/components/Container";
import ChartComponent from "@/components/LineChart/chartComponent";

export default function Home() {
  return (
    <Container>
      <FormComponent />
      <ChartComponent />
      <Footer />
    </Container>
  )
};