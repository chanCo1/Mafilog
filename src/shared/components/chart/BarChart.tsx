/**
 * @file: BarChart.tsx
 * @author: chad
 * @since: 2026.05.12 ~
 * @description: Bar 차트 컴포넌트
 */

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

interface IBarChart {
  labels: string[];
  dataLabel?: string;
  data: number[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

export default function BarChart({ data, dataLabel = '지출 (원)', labels }: IBarChart) {
  const dataOptions = {
    labels: labels,
    datasets: [
      {
        label: dataLabel,
        data: data,
        backgroundColor: 'rgba(255,150,146)',
        borderRadius: 4,
      },
    ],
  };

  // 3. 차트 옵션 설정
  const options: ChartOptions<'bar'> = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: '#fff',
        align: 'start',
        anchor: 'start',
        offset: -80,
        formatter: (value: number) => {
          return value.toLocaleString() + '원';
        },
        font: {
          weight: 'bold',
          size: 12,
        },
      },
    },
    scales: {
      x: {
        display: true,
        position: 'top',
        grid: { display: true },
        ticks: {
          stepSize: 50000,
          callback: function (value: any) {
            return value / 10000;
          },
        },
      },
      y: {
        grid: { display: true },
      },
    },
  };

  return (
    <div className="relative max-mobile:h-70 h-75 w-full">
      <span className="text-text-secondary absolute top-1 left-0 text-xs">
        단위: 만
      </span>

      <div className="h-full">
        <Bar data={dataOptions} options={options} />
      </div>
    </div>
  );
}
