import { useState, useEffect } from 'react';
import instances from '../../../../../../../../../utils/plugin/axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const months = ['Th 1', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7', 'Th 8', 'Th 9', 'Th 10', 'Th 11', 'Th 12'];

const options = {
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};

const BarChart = (props) => {
  const { revenueData, shipCost } = props;
  const [chartData, setChartData] = useState({
    labels: months,
    datasets: [
      {
        label: 'Doanh thu',
        data: revenueData,
      },
      {
        label: 'Vận chuyển',
        data: shipCost,
      },
    ],
  });

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
