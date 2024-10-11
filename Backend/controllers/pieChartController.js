const Transaction = require('../models/transactions');

const getPieChartData = async (req, res) => {
    const month = req.params.month;
    const startDate = new Date(`2024-${month}-01`);
    const endDate = new Date(`2024-${month}-31`);

    try {
        const pieData = await Transaction.aggregate([
            { $match: { dateOfSale: { $gte: startDate, $lte: endDate } } },
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);

        res.status(200).json(pieData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching pie chart data' });
    }
};

module.exports = { getPieChartData };
