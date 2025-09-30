// 代码生成时间: 2025-09-30 19:27:45
 * This tool allows users to test different API endpoints.
 */

const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the API Test Tool!');
});

// Endpoint to test GET requests
app.get('/api/get', (req, res) => {
  // Simulate a response from an API
  res.json({
    message: 'GET request successful!',
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
  });
});

// Endpoint to test POST requests
app.post('/api/post', (req, res) => {
  // Simulate processing the request body
  const requestBody = req.body;
  if (!requestBody) {
    res.status(400).send('Bad Request: No data provided');
  } else {
    res.status(201).json({
      message: 'POST request successful!',
      receivedData: requestBody,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`API Test Tool listening at http://localhost:${port}`);
});
