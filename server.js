const express = require('express');
const mongoose = require('mongoose'); // MongoDB library
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // To load environment variables from .env file

const authRoute = require('./routes/auth'); // Import the auth route

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

// Connect to the database
connectDB();

// Mount the auth route
app.use('/api/auth', authRoute);

// Start the server
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
