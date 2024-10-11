const express = require('express');
const { getBarChartData } = require('../controllers/barChartController');
const router = express.Router();

router.get('/bar-chart/:month', getBarChartData);

module.exports = router;
