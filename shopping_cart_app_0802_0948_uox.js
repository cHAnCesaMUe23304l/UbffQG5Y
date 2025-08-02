// 代码生成时间: 2025-08-02 09:48:52
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory store for shopping cart items
let cart = [];

// Route to add items to the cart
app.post('/cart/add', (req, res) => {
  const { item } = req.body;
  if (!item) {
    return res.status(400).json({
      message: 'Item is required'
    });
  }
  // Check if item already exists in the cart
  const existingItemIndex = cart.findIndex(i => i.id === item.id);
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += item.quantity;
  } else {
    cart.push({ ...item, quantity: item.quantity });
  }
  res.status(201).json({
    message: 'Item added to cart',
    cart
  });
});

// Route to remove items from the cart
app.post('/cart/remove', (req, res) => {
  const { itemId } = req.body;
  if (!itemId) {
    return res.status(400).json({
      message: 'Item ID is required'
    });
  }
  cart = cart.filter(item => item.id !== itemId);
  res.json({
    message: 'Item removed from cart',
    cart
  });
});

// Route to get the cart contents
app.get('/cart', (req, res) => {
  res.json({
    cart
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Internal Server Error'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Shopping Cart App listening on port ${PORT}`);
});