// 代码生成时间: 2025-09-21 06:44:07
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock database of users
const users = {
  'user1': { password: 'pass1' },
  'user2': { password: 'pass2' }
};

/**
 * Middleware to verify user credentials
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Callback function
 */
function verifyUser(req, res, next) {
  const { username, password } = req.body;
  if (!users[username] || users[username].password !== password) {
    res.status(401).json({
      error: 'Invalid username or password'
    });
  } else {
    req.user = username;
    next();
  }
}

/**
 * Login route
 */
app.post('/login', verifyUser, (req, res) => {
  res.json({
    message: 'Login successful',
    user: req.user
  });
});

/**
 * Error handling middleware
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
