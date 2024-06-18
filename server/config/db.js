const mongoose = require('mongoose');

// Disable strict mode for queries
mongoose.set('strictQuery', false);

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Connect to MongoDB using the provided URI
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: \x1b[96m${conn.connection.host}\x1b[0m`);
    } catch (err) {
        // If an error occurs during connection, log the error message and exit the process
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;