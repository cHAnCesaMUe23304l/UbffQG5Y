// 代码生成时间: 2025-08-08 11:40:24
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse the body of a POST request
app.use(express.json());

/**
 * Generates a random number between a minimum and maximum value.
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {number} A random number between min and max.
 */
function generateRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and minimum is inclusive
}

/**
 * Route to handle GET requests for generating a random number.
 * It expects a query parameter 'min' and 'max' to determine the range.
 */
app.get('/random-number', (req, res) => {
  const { min, max } = req.query;
  if (typeof min !== 'number' || typeof max !== 'number' || min >= max) {
    return res.status(400).json({
      error: 'Invalid input: min and max must be numbers and min < max.'
    });
  }
  
  const randomNumber = generateRandomNumber(min, max);
  res.json({
    randomNumber: randomNumber
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Random number generator running at http://localhost:${port}`);
});