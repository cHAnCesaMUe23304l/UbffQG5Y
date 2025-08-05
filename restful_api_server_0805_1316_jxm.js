// 代码生成时间: 2025-08-05 13:16:52
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data for demonstration purposes
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
];

// Get all items
app.get('/api/items', (req, res) => {
  res.status(200).json(items);
});

// Get a single item by ID
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Create a new item
app.post('/api/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update an existing item
app.put('/api/items/:id', (req, res) => {
  let item = items.find(i => i.id === parseInt(req.params.id));
  if (item) {
    item.name = req.body.name;
    res.status(200).json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Delete an item
app.delete('/api/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index > -1) {
    items.splice(index, 1);
    res.status(200).json({ message: 'Item deleted' });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// Server listening on port 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});