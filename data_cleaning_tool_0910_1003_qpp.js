// 代码生成时间: 2025-09-10 10:03:34
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a data cleaning function
function cleanData(data) {
  // Remove null or undefined values
  const cleanedData = data.map(item => {
    const cleanItem = {};
    for (const key in item) {
      if (item[key] !== null && item[key] !== undefined) {
        cleanItem[key] = item[key];
      }
    }
    return cleanItem;
  });

  // Convert strings to lower case
  cleanedData.forEach(item => {
    for (const key in item) {
      if (typeof item[key] === 'string') {
        item[key] = item[key].toLowerCase();
      }
    }
  });

  return cleanedData;
}

// Endpoint to receive data and return cleaned data
app.post('/clean-data', (req, res) => {
  // Check if data is provided
  if (!req.body.data || !Array.isArray(req.body.data)) {
    return res.status(400).json({
      message: 'Invalid data format. Please provide an array of objects.'
    });
  }

  try {
    // Clean the data
    const cleaned = cleanData(req.body.data);
    // Return the cleaned data
    res.status(200).json({ cleaned });
  } catch (error) {
    // Handle any errors that occur during data cleaning
    res.status(500).json({
      message: 'An error occurred during data cleaning.',
      error: error.message
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Data cleaning tool running on port ${port}`);
});
