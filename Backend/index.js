const express = require('express');
const connectDB = require('./config/db');
const initializeRoutes = require('./routes/initialize');
const transactionsRoutes = require('./routes/transactions');
const statisticsRoutes = require('./routes/statistics');
const barChartRoutes = require('./routes/barChart');
const pieChartRoutes = require('./routes/pieChart');
const combinedRoutes = require('./routes/combined');
const cors=require('cors')
const app = express();

app.use(cors())
app.use(express.json());

connectDB();

app.use('/api', initializeRoutes);
app.use('/api', transactionsRoutes);
app.use('/api', statisticsRoutes);
app.use('/api', barChartRoutes);
app.use('/api', pieChartRoutes);
app.use('/api', combinedRoutes);

connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));