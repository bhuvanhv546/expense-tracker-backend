const express = require('express');
const {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget
} = require('../controllers/budgetController');

const { protect } = require('../middleware/auth');
const { budgetValidation } = require('../middleware/validation');

const router = express.Router();

router.use(protect);

router.route('/')
  .post(budgetValidation, createBudget)
  .get(getBudgets);

router.route('/:id')
  .put(budgetValidation, updateBudget)
  .delete(deleteBudget);

module.exports = router;
