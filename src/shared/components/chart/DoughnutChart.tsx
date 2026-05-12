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
// import ChartDataLabels from 'chartjs-plugin-datalabels';

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
  // ChartDataLabels,
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

  // 3. 차트 옵션 설정
  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '40%',
    plugins: {
      legend: {
        display: false,
      },
      // datalabels: {
      //   display: true,
      //   color: '#fff',
      //   align: 'start',
      //   anchor: 'start',
      //   offset: -80,
      //   formatter: (value: number) => {
      //     return value.toLocaleString() + '원';
      //   },
      //   font: {
      //     weight: 'bold',
      //     size: 12,
      //   },
      // },
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
