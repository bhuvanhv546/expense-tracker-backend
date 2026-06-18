const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Shopping', 'Transport', 'Entertainment', 'Bills', 'Healthcare', 'Education', 'Other']
  },
  limit: {
    type: Number,
    required: [true, 'Please add a budget limit'],
    min: [1, 'Limit must be greater than 0']
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  year: {
    type: Number,
    required: true,
    min: 2024,
    max: 2100
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

BudgetSchema.index(
  { userId: 1, category: 1, month: 1, year: 1 },
  { unique: true }
);

BudgetSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Budget', BudgetSchema);
