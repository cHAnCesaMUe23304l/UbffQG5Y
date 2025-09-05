// 代码生成时间: 2025-09-05 14:09:49
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mock data for demonstration purposes
const mockData = {
  users: [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    // ... more user data
  ],
  products: [
    { id: 1, name: 'Product A', price: 19.99 },
    { id: 2, name: 'Product B', price: 29.99 },
    // ... more product data
  ],
  // ... other data types
};

// Route to generate random user data
app.get('/api/user', (req, res) => {
  try {
    const randomUser = mockData.users[Math.floor(Math.random() * mockData.users.length)];
    res.status(200).json(randomUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to generate random product data
app.get('/api/product', (req, res) => {
  try {
    const randomProduct = mockData.products[Math.floor(Math.random() * mockData.products.length)];
    res.status(200).json(randomProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: err.message });
  } else {
    next();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Test data generator running on port ${port}`);
});

// Documentation
/**
 * @api {get} /api/user Generate random user data
 * @apiGroup Test Data
 * @apiSuccess {Number} id User ID
 * @apiSuccess {String} name User name
 * @apiSuccess {String} email User email
 */

/**
 * @api {get} /api/product Generate random product data
 * @apiGroup Test Data
 * @apiSuccess {Number} id Product ID
 * @apiSuccess {String} name Product name
 * @apiSuccess {Number} price Product price
 */