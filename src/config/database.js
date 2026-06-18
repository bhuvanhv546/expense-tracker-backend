const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('URI exists:', !!process.env.MONGODB_URI);
    console.log(process.env.MONGODB_URI?.substring(0, 40));
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB Error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;