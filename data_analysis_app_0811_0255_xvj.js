// 代码生成时间: 2025-08-11 02:55:18
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mock data for demonstration purposes
const mockData = [
  { day: 'Monday', value: 100 },
  { day: 'Tuesday', value: 200 },
  { day: 'Wednesday', value: 150 },
  { day: 'Thursday', value: 300 },
  { day: 'Friday', value: 250 },
];

// Function to analyze data
function analyzeData(data) {
  const sum = data.reduce((acc, curr) => acc + curr.value, 0);
  const average = sum / data.length;
  const max = Math.max(...data.map(item => item.value));
  const min = Math.min(...data.map(item => item.value));

  return {
    sum: sum,
    average: average,
    max: max,
    min: min,
  };
}

// Route to analyze data
app.post('/analyze', (req, res) => {
  try {
    // Validate request body
    if (!Array.isArray(req.body.data)) {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    // Analyze data
    const result = analyzeData(req.body.data);

    // Send back the result
    res.status(200).json(result);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Data Analysis App listening at http://localhost:${port}`);
});

// Documentation on how to use the API
// POST /analyze - sends an array of data objects with 'day' and 'value' properties
// Response: { sum, average, max, min }