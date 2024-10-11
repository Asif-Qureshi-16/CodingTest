const Transaction = require('../models/transactions');

const listTransactions = async (req, res) => {
    const { page = 1, perPage = 10, search = '', month } = req.query;
    const regex = new RegExp(search, 'i');
    const monthNumber = new Date(`2024-${month}-01`).getMonth() + 1;

    const query = {
        $or: [
            { tTitle: regex },
            { tDesc: regex },
            { tPrice: { $regex: search } }
        ],
        dateOfSale: { $month: monthNumber }
    };

    try {
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));

        const totalCount = await Transaction.countDocuments(query);

        res.status(200).json({ transactions, totalCount });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions' });
    }
};

module.exports = { listTransactions };
