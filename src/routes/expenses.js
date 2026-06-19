const express = require('express');
const {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenseSummary
} = require('../controllers/expenseController');

const { protect } = require('../middleware/auth');
const { expenseValidation } = require('../middleware/validation');

const router = express.Router();

const Expense = require('../models/Expense');

router.post('/auto-import', async (req, res) => {
  try {

    const expense = await Expense.create({
      userId: '6a3424ee480873be685426a2',
      amount: req.body.amount,
      merchant: req.body.merchant || 'PhonePe',
      category: 'Other',
      source: 'PhonePe',
      timestamp: new Date()
    });

    res.status(201).json({
      success: true,
      data: expense
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });

  }
});
router.get('/test-public', (req, res) => {
  res.json({
    success: true,
    message: 'public route working'
  });
});      
router.use(protect);

router.route('/')
  .post(expenseValidation, createExpense)
  .get(getExpenses);

router.get('/summary', getExpenseSummary);

router.route('/:id')
  .get(getExpenseById)
  .put(expenseValidation, updateExpense)
  .delete(deleteExpense);

module.exports = router;
