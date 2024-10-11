import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchBarChartData } from '../services/api.js';

const BarChart = ({ selectedMonth }) => {
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    const getBarChartData = async () => {
      const data = await fetchBarChartData(selectedMonth);
      setBarChartData(data);
    };

    getBarChartData();
  }, [selectedMonth]);

  const data = {
    labels: ['0-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901+'],
    datasets: [
      {
        label: 'Number of Items',
        data: barChartData.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return <Bar data={data} />;
};

export default BarChart;
