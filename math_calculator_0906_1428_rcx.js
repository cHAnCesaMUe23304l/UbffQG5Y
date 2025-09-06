// 代码生成时间: 2025-09-06 14:28:00
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Define math operations
const mathOperations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }
};

// API endpoint for performing math operations
app.post('/math', (req, res) => {
  const { operation, a, b } = req.body;
  if (!mathOperations[operation]) {
    return res.status(400).json({
      error: `Unsupported operation: ${operation}`
    });
  }
  try {
    const result = mathOperations[operation](a, b);
    res.json({
      operation,
      result
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Math calculator server listening at http://localhost:${port}`);
});