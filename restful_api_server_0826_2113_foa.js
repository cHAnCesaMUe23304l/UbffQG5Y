// 代码生成时间: 2025-08-26 21:13:45
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse request bodies
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Route handlers
// GET /api/users - Retrieve a list of users
app.get('/api/users', (req, res) => {
  // Simulate a database call
  const users = [{
    id: 1,
    name: 'John Doe',
  }, {
    id: 2,
    name: 'Jane Smith',
  }];
  
  res.status(200).json(users);
});

// POST /api/users - Create a new user
app.post('/api/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      error: 'Name is required',
    });
  }
  
  // Simulate a database call
  const newUser = {
    id: Date.now(),
    name: name,
  };
  res.status(201).json(newUser);
});

// Starting the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
