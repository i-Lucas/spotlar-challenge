import Chart from "chart.js/auto";
import { getLast12MonthsNames } from "@/utils/last12Dates";

interface CurrencyPair {
  from: string;
  to: string;
  color: string;
};

export function createChart(ctx: CanvasRenderingContext2D | null, currencyPair: CurrencyPair, data: number[]) {
  if (!ctx || !data.length) return;

  const { from, to, color } = currencyPair;
  const labelFormat = (from: string, to: string) => `${from.toUpperCase()} - ${to.toUpperCase()}`;

  const datasets = [{
    data: data,
    fill: false,
    tension: 0.2,
    borderColor: color,
    label: labelFormat(from, to)
  }];

  const title = {
    display: true,
    text: `( ${labelFormat(from, to)} ) Exchange Rate History`,
  };

  return new Chart(ctx, {
    type: "line",
    data: {
      labels: getLast12MonthsNames(),
      datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            usePointStyle: true,
          },
        },
        title
      },
    }
  });
};