const axios = require('axios');

const getCombinedData = async (req, res) => {
    const month = req.params.month;

    try {
        const statsPromise = axios.get(`/statistics/${month}`);
        const barChartPromise = axios.get(`/bar-chart/${month}`);
        const pieChartPromise = axios.get(`/pie-chart/${month}`);

        const [stats, barChart, pieChart] = await Promise.all([statsPromise, barChartPromise, pieChartPromise]);

        res.status(200).json({ stats: stats.data, barChart: barChart.data, pieChart: pieChart.data });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching combined data' });
    }
};

module.exports = { getCombinedData };
