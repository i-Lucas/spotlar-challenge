import React from "react";
import Chart from "chart.js/auto";
import Container from "../Container";
import { createChart } from "./createChart";
import styles from "@/styles/Chart.module.css";
import getExchangeRateHistory from "@/hooks/last12ExchangeRate";

interface CurrencyPair {
  from: string;
  to: string;
  color: string;
}

interface LineChartProps {
  currencyPair: CurrencyPair;
}

interface ILineChartState {
  error: string | null;
  loading: boolean;
}

const LineChart = ({ currencyPair }: LineChartProps) => {

  const chartRef = React.useRef<Chart>();
  const [data, setData] = React.useState<number[]>([]);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = React.useState<ILineChartState>({
    error: null,
    loading: true
  });

  React.useEffect(() => {

    (async () => {
      try {
        const response = await getExchangeRateHistory(currencyPair.from, currencyPair.to);
        setData(response);
        setStatus({ ...status, loading: false });
      } catch (error) {
        setStatus({ error: `${error}`, loading: false });
      }
    })();

  }, [currencyPair]);

  React.useEffect(() => {

    const canvas = canvasRef.current;
    if (!canvas || !data.length) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const destroyChart = () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = undefined;
      }
    };

    destroyChart();
    chartRef.current = createChart(ctx, currencyPair, data);
    return () => destroyChart();

  }, [data, currencyPair]);

  if (status.loading) {
    return (
      <div className={styles.main}>
        <h1>loading spinner here ...</h1>
      </div>
    )
  };

  if (status.error) {
    console.error(status.error);
    return (
      <div className={styles.main}>
        <h1>error ...</h1>
      </div>
    )
  };

  return (
    <Container className={styles.lineChart}>
      <canvas ref={canvasRef} />
    </Container>
  )
};

export default LineChart;