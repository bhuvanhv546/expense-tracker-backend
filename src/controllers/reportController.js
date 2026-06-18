const Expense = require('../models/Expense');

const getMonthlyReport = async (req, res, next) => {
  try {
    const { year } = req.query;
    const currentYear = parseInt(year) || new Date().getFullYear();

    const monthlyData = [];

    for (let month = 1; month <= 12; month++) {
      const startDate = new Date(currentYear, month - 1, 1);
      const endDate = new Date(currentYear, month, 0);

      const expenses = await Expense.find({
        userId: req.user.id,
        timestamp: { $gte: startDate, $lte: endDate }
      });

      const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
      const count = expenses.length;

      monthlyData.push({
        month,
        year: currentYear,
        total,
        count,
        average: count > 0 ? total / count : 0
      });
    }

    res.status(200).json({
      success: true,
      data: monthlyData
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryAnalytics = async (req, res, next) => {
  try {
    const { months = 3 } = req.query;

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - parseInt(months));

    const expenses = await Expense.find({
      userId: req.user.id,
      timestamp: { $gte: startDate }
    });

    const categoryData = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});

    const total = Object.values(categoryData).reduce((sum, val) => sum + val, 0);

    const categories = Object.keys(categoryData)
      .map(category => ({
        category,
        amount: categoryData[category],
        percentage: (categoryData[category] / total) * 100
      }))
      .sort((a, b) => b.amount - a.amount);

    res.status(200).json({
      success: true,
      data: {
        categories,
        total,
        period: `${months} months`
      }
    });
  } catch (error) {
    next(error);
  }
};

const getDailyTrends = async (req, res, next) => {
  try {
    const { days = 30 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const expenses = await Expense.find({
      userId: req.user.id,
      timestamp: { $gte: startDate }
    }).sort({ timestamp: 1 });

    const dailyData = {};

    expenses.forEach(exp => {
      const date = exp.timestamp.toISOString().split('T')[0];

      if (!dailyData[date]) {
        dailyData[date] = {
          date,
          total: 0,
          count: 0
        };
      }

      dailyData[date].total += exp.amount;
      dailyData[date].count += 1;
    });

    const trends = Object.values(dailyData);

    res.status(200).json({
      success: true,
      data: {
        trends,
        period: `${days} days`,
        averageDaily:
          trends.length > 0
            ? trends.reduce((sum, day) => sum + day.total, 0) / trends.length
            : 0
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMonthlyReport,
  getCategoryAnalytics,
  getDailyTrends
};
