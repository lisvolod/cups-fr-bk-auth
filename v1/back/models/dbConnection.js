const mongoose = require('mongoose');
require('dotenv/config');
require('./product.model');


const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connection succeeded...');
  } catch (error) {
    console.error('MongoDB database connection error:', error);
  }
};

module.exports = { connectToDatabase };


