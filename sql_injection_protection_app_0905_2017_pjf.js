// 代码生成时间: 2025-09-05 20:17:13
// sql_injection_protection_app.js
// This Express application demonstrates how to prevent SQL injection attacks.

// Required modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Create a new Express application
const app = express();

// Set the port for the application
const PORT = 3000;

// Use middleware to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test_db'
});

// Function to escape query parameters and prevent SQL injection
function escapeQueryParameter(value) {
  return mysql.escape(value);
}

// Endpoint to handle GET requests for user data
app.get('/users', (req, res) => {
  // Retrieve the user ID from the query parameters
  const userId = escapeQueryParameter(req.query.id);

  // Construct the SQL query with escaped parameters
  const query = 'SELECT * FROM users WHERE id = ' + userId;

  // Execute the SQL query
  pool.query(query, (error, results) => {
    if (error) {
      // Handle any SQL errors
      res.status(500).send('Internal Server Error');
    } else {
      // Send the user data back to the client
      res.json(results);
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  // Log the error to the console
  console.error(err.stack);
  // Send a generic error response to the client
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});