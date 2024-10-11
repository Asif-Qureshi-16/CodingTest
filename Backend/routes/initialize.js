const express = require('express');
const { initializeDatabase } = require('../controllers/initializeController');
const router = express.Router();

router.get('/initialize', initializeDatabase);

module.exports = router;
