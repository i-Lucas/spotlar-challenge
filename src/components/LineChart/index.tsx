import React from "react";
import Chart from "chart.js/auto";
import { Alert, AlertTitle, Skeleton } from "@mui/material";
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
  const [status, setStatus] = React.useState({
    loading: false, error: ""
  });

  React.useEffect(() => {

    (async () => {
      try {
        setStatus({ ...status, loading: true });
        const response = await getExchangeRateHistory(currencyPair.from, currencyPair.to);
        setData(response);
        setStatus({ ...status, loading: false });
      } catch (error) {
        setStatus({ ...status, error: `${error}` });
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
      <div className={styles.lineChart}>
        <Skeleton
          variant="rounded"
          className={styles.lineChartSkeleton}
        />
      </div>
    )
  };

  if (status.error.length !== 0) {
    return (
      <div className={styles.lineChart}>
        <Alert severity="error" variant="outlined" className={styles.lineChartError}>
          <AlertTitle>Error</AlertTitle>
          sorry, something went wrong. — <strong>please try again</strong>
          <br /><br />
          message: {status.error}
        </Alert>
      </div>
    )
  }

  return (
    <div className={styles.lineChart}>
      <canvas ref={canvasRef} />
    </div>
  )
};

export default LineChart;