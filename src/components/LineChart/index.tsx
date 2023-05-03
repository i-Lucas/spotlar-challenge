import React from "react";
import Chart from "chart.js/auto";
import { createChart } from "./createChart";
import styles from "@/styles/Chart.module.css";
import getExchangeRateHistory from "@/hooks/last12ExchangeRate";

interface LineChartProps {
  currencyPair: {
    from: string;
    to: string;
    color: string;
  };
}

const LineChart = ({ currencyPair }: LineChartProps) => {

  const chartRef = React.useRef<Chart>();
  const [data, setData] = React.useState<number[]>([]);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {

    (async () => {
      try {
        const response = await getExchangeRateHistory(currencyPair.from, currencyPair.to);
        setData(response);
      } catch (error) {
        console.error(error);
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

  return (
    <div className={styles.lineChart}>
      <canvas ref={canvasRef} />
    </div>
  )
};

export default LineChart;