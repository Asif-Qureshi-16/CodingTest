import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { fetchPieChartData } from '../services/api';

const PieChart = ({ selectedMonth }) => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const getPieChartData = async () => {
      const data = await fetchPieChartData(selectedMonth);
      setPieChartData(data);
    };

    getPieChartData();
  }, [selectedMonth]);

  const data = {
    labels: pieChartData.map(item => item._id),
    datasets: [
      {
        label: 'Categories',
        data: pieChartData.map(item => item.count),
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
