/**
 * @file: DoughnutChart.tsx
 * @author: chad
 * @since: 2026.05.12 ~
 * @description: 도넛 차트 컴포넌트
 */

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  // Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

interface IDoughnutChart {
  labels: string[];
  dataLabel?: string;
  data: number[];
  backgroundColor: string[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  // Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

export default function DoughnutChart({
  data,
  dataLabel = '%',
  labels,
  backgroundColor,
}: IDoughnutChart) {
  const dataOptions = {
    labels: labels,
    datasets: [
      {
        label: dataLabel,
        data,
        backgroundColor,
        borderRadius: 4,
      },
    ],
  };

  // 차트 옵션 설정
  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '40%',
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: '#fff',
        font: {
          weight: 'bold',
          size: 12,
        },
        textAlign: 'center',
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels?.[ctx.dataIndex];
          if (value === 0 || value < 5) return null;
          return `${label}\n${value}%`;
        },
      },
    },
  };

  return (
    <div className="max-mobile:h-70 relative h-75 w-full">
      <div className="h-full">
        <Doughnut data={dataOptions} options={options} />
      </div>
    </div>
  );
}
