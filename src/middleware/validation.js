const { body, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

const registerValidation = [
  body('name').notEmpty().withMessage('Name is required').trim().isLength({ min: 2, max: 50 }),
  body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validateRequest
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest
];

const expenseValidation = [
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
  body('merchant').notEmpty().withMessage('Merchant is required').trim(),
  body('category').optional().isIn(['Food', 'Shopping', 'Transport', 'Entertainment', 'Bills', 'Healthcare', 'Education', 'Other']),
  body('source').optional().isIn(['Google Pay', 'PhonePe', 'Paytm', 'BHIM', 'Manual']),
  body('transactionId').optional().trim(),
  body('timestamp').optional().isISO8601(),
  validateRequest
];

const budgetValidation = [
  body('category').isIn(['Food', 'Shopping', 'Transport', 'Entertainment', 'Bills', 'Healthcare', 'Education', 'Other']),
  body('limit').isFloat({ min: 1 }).withMessage('Limit must be greater than 0'),
  body('month').isInt({ min: 1, max: 12 }),
  body('year').isInt({ min: 2024, max: 2100 }),
  validateRequest
];

module.exports = {
  registerValidation,
  loginValidation,
  expenseValidation,
  budgetValidation
};
