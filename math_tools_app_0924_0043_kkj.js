// 代码生成时间: 2025-09-24 00:43:48
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse request body
app.use(express.json());

// Math operations
const mathOperations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => (b !== 0 ? a / b : 'Error: Division by zero'),
};

// Define routes
app.post('/math/:operation', (req, res) => {
  const { operation } = req.params;
  const { a, b } = req.body;

  // Validate inputs
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({
      error: 'Invalid input: Both a and b must be numbers.',
    });
  }

  // Perform the operation if valid
  if (mathOperations[operation]) {
    const result = mathOperations[operation](a, b);
    res.json({ result });
  } else {
    // Handle invalid operation
    res.status(404).json({
      error: `Operation '${operation}' not found.`,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
  });
});

// Start server
app.listen(port, () => {
  console.log(`Math tools application listening at http://localhost:${port}`);
});