const express = require('express');
const {
  getMonthlyReport,
  getCategoryAnalytics,
  getDailyTrends
} = require('../controllers/reportController');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/monthly-report', getMonthlyReport);
router.get('/category-analytics', getCategoryAnalytics);
router.get('/daily-trends', getDailyTrends);

module.exports = router;
