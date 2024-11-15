const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();  // This will load the variables from .env

const connectDB = async () => {
  try {
    // Mongo URI from your .env file
    const mongoURI = process.env.MONGO_URI;

    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);  // Exit process with failure
  }
};

module.exports = connectDB;
