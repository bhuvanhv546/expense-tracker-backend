const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount'],
    min: [0.01, 'Amount must be greater than 0']
  },
  merchant: {
    type: String,
    required: [true, 'Please add a merchant name'],
    trim: true,
    maxlength: [100, 'Merchant name cannot be more than 100 characters']
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Shopping', 'Transport', 'Entertainment', 'Bills', 'Healthcare', 'Education', 'Other'],
    default: 'Other'
  },
  source: {
    type: String,
    required: true,
    enum: ['Google Pay', 'PhonePe', 'Paytm', 'BHIM', 'Manual'],
    default: 'Manual'
  },
  transactionId: {
    type: String,
    sparse: true,
    trim: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ExpenseSchema.index({ userId: 1, timestamp: -1 });
ExpenseSchema.index({ userId: 1, category: 1 });

module.exports = mongoose.model('Expense', ExpenseSchema);
