import React, { useEffect, useState } from 'react';
import { fetchStatistics } from '../services/api';

const Statistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSales: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    const getStatistics = async () => {
      const data = await fetchStatistics(selectedMonth);
      setStatistics(data);
    };

    getStatistics();
  }, [selectedMonth]);

  return (
    <div className="statistics-box">
      <h3>Statistics for {selectedMonth}</h3>
      <p>Total Sales: ${statistics.totalSales}</p>
      <p>Total Sold Items: {statistics.totalSoldItems}</p>
      <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
    </div>
  );
};

export default Statistics;
