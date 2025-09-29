// 代码生成时间: 2025-09-29 18:45:45
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mock database for storing advertisements
const advertisements = [];

// Function to generate a unique ID for each advertisement
function generateId() {
  return `ad-${Math.random().toString(36).substr(2, 9)}`;
}

// POST endpoint to create a new advertisement
app.post('/create-ad', (req, res) => {
  try {
    // Validate the request body
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({
        error: 'Title and content are required for an advertisement'
      });
    }

    // Create a new advertisement object
    const ad = {
      id: generateId(),
      title: req.body.title,
      content: req.body.content,
      createdAt: new Date().toISOString()
    };

    // Add the advertisement to the mock database
    advertisements.push(ad);

    // Return the created advertisement
    return res.status(201).json(ad);
  } catch (error) {
    return res.status(500).json({
      error: 'Error creating advertisement'
    });
  }
});

// GET endpoint to retrieve all advertisements
app.get('/ads', (req, res) => {
  try {
    // Return the list of all advertisements
    return res.json(advertisements);
  } catch (error) {
    return res.status(500).json({
      error: 'Error retrieving advertisements'
    });
  }
});

// GET endpoint to retrieve a single advertisement by ID
app.get('/ad/:id', (req, res) => {
  try {
    // Find the advertisement by ID
    const ad = advertisements.find(ad => ad.id === req.params.id);

    // If the advertisement is not found, return a 404 error
    if (!ad) {
      return res.status(404).json({
        error: 'Advertisement not found'
      });
    }

    // Return the advertisement
    return res.json(ad);
  } catch (error) {
    return res.status(500).json({
      error: 'Error retrieving advertisement'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'An unexpected error occurred'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Advertisting system running on port ${port}`);
});
