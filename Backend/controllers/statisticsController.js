const Transaction = require('../models/transactions');

const getStatistics = async (req, res) => {
    const month = req.params.month;
    const startDate = new Date(`2024-${month}-01`);
    const endDate = new Date(`2024-${month}-31`);

    try {
        const totalSales = await Transaction.aggregate([
            { $match: { dateOfSale: { $gte: startDate, $lte: endDate } } },
            { $group: { _id: null, totalAmount: { $sum: '$price' }, totalSold: { $sum: 1 } } }
        ]);

        const totalNotSold = await Transaction.countDocuments({
            dateOfSale: { $lt: startDate }
        });

        res.status(200).json({
            totalSales: totalSales[0]?.totalAmount || 0,
            totalSoldItems: totalSales[0]?.totalSold || 0,
            totalNotSoldItems: totalNotSold
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching statistics' });
    }
};

module.exports = { getStatistics };
