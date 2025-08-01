// 代码生成时间: 2025-08-02 02:58:23
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse request body
app.use(express.json());

// In-memory store for themes
let userThemes = {};

// Route to set the theme for a user
app.post('/api/set-theme', (req, res) => {
  // Fetch the user ID and theme from the request body
  const { userId, theme } = req.body;
  
  // Validate input
  if (!userId || !theme) {
    return res.status(400).json({
      error: 'User ID and theme are required'
    });
  }
  
  // Check if the theme is valid (for simplicity, assume themes are 'light' or 'dark')
  if (theme !== 'light' && theme !== 'dark') {
    return res.status(400).json({
      error: 'Invalid theme'
    });
  }
  
  // Set the theme for the user
  userThemes[userId] = theme;
  
  // Respond with success
  res.status(200).json({
    message: 'Theme set successfully',
    userId: userId,
    theme: theme
  });
});

// Route to get the current theme for a user
app.get('/api/get-theme', (req, res) => {
  const { userId } = req.query;
  
  // Validate input
  if (!userId) {
    return res.status(400).json({
      error: 'User ID is required'
    });
  }
  
  // Fetch the theme for the user
  const theme = userThemes[userId] || 'No theme set';
  
  // Respond with the theme
  res.status(200).json({
    userId: userId,
    theme: theme
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
