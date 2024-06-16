const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/CYB-LMS';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Database: MongoDB connected',mongoURI);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  }
};

module.exports = connectDB;
