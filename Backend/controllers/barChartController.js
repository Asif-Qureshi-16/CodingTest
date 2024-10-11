const Transaction = require('../models/transactions');

const getBarChartData = async (req, res) => {
    const month = req.params.month;
    const startDate = new Date(`2024-${month}-01`);
    const endDate = new Date(`2024-${month}-31`);

    try {
        const barData = await Transaction.aggregate([
            { $match: { dateOfSale: { $gte: startDate, $lte: endDate } } },
            {
                $bucket: {
                    groupBy: "$price",
                    boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
                    default: "Other",
                    output: { count: { $sum: 1 } }
                }
            }
        ]);

        res.status(200).json(barData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching bar chart data' });
    }
};

module.exports = { getBarChartData };
