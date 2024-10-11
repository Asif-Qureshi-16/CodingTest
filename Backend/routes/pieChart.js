const express = require('express');
const { getPieChartData } = require('../controllers/pieChartController');
const router = express.Router();

router.get('/pie-chart/:month', getPieChartData);

module.exports = router;
