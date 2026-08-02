"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type Props = {
  labels: string[];
  omzet: number[];
};

export default function OmzetGrafiek({
  labels,
  omzet,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        📈 Omzetontwikkeling
      </h2>

      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Omzet (€)",
              data: omzet,
              borderWidth: 3,
              tension: 0.35,
              fill: false,
            },
          ],
        }}
        options={{
          responsive: true,

          plugins: {
            legend: {
              display: true,
            },
          },

          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />

    </div>
  );
}