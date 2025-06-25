// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const productroutes = require('./routes/productroutes');
const logger = require('./Middleware/logger');
const errorHandler = require('./Middleware/errorHandler');
const auth = require('./Middleware/auth');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
//constraints
const mongodbUri = 'mongodb://localhost:27017/NRNPDB';


// Middleware setup
app.use(bodyParser.json());
app.use(logger);
app.use(auth);
app.use(errorHandler);

//Hello World Route
app.get('/', (req, res) => {
  res.send('Hello World! Welcome to the Product Management API');
});

// Routes
app.use('/products', productroutes);


// Connect to MongoDB
mongoose.connect(mongodbUri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
 }).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// Example route implementation for GET /api/products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 