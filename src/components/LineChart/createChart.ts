import Chart from "chart.js/auto";
import { getLast12MonthsNames } from "@/utils/last12Dates";

interface CurrencyPair {
  from: string;
  to: string;
  color: string;
}

export function createChart(ctx: CanvasRenderingContext2D | null, currencyPair: CurrencyPair, data: number[]) {
  if (!ctx || !data.length) return;

  const { from, to, color } = currencyPair;

  return new Chart(ctx, {
    type: "line",
    data: {
      labels: getLast12MonthsNames(),
      datasets: [
        {
          label: `${from.toUpperCase()} - ${to.toUpperCase()}`,
          data: data,
          fill: false,
          borderColor: color,
          tension: 0.2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: `${from.toUpperCase()} - ${to.toUpperCase()} Exchange Rate History`,
        },
      },
    },
  });
};