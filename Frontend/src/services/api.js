import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const fetchTransactions = async (month, search = '', page = 1) => {
  const response = await axios.get(`${API_URL}/transactions`, {
    params: { month, search, page }
  });
  return response.data;
};

export const fetchStatistics = async (month) => {
  const response = await axios.get(`${API_URL}/statistics/${month}`);
  return response.data;
};

export const fetchBarChartData = async (month) => {
  const response = await axios.get(`${API_URL}/bar-chart/${month}`);
  return response.data;
};

export const fetchPieChartData = async (month) => {
  const response = await axios.get(`${API_URL}/pie-chart/${month}`);
  return response.data;
};
