const axios = require('axios');
const Transaction = require('../models/transactions');

const initializeDatabase = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await Transaction.deleteMany(); // Clear existing data
        const transactions = response.data.map(item => ({
            title: item.title,
            description: item.description,
            price: item.price,
            dateOfSale: new Date(item.dateOfSale),
            category: item.category
        }));
        await Transaction.insertMany(transactions);
        res.status(200).json({ message: 'Database initialized successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to initialize database.' });
    }
};

module.exports = { initializeDatabase };
