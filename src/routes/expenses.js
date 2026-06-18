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
