// 代码生成时间: 2025-08-29 15:17:56
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mock database
const orders = [];

// POST endpoint to create a new order
app.post('/orders', (req, res) => {
  try {
    // Check for required fields
    if (!req.body.productId || !req.body.quantity) {
      return res.status(400).send({
        error: 'Missing productId or quantity in request'
      });
    }

    // Create order object
    const order = {
      id: orders.length + 1,
      productId: req.body.productId,
      quantity: req.body.quantity,
      status: 'pending'
    };

    // Add order to the mock database
    orders.push(order);

    // Send success response
    res.status(201).send(order);
  } catch (error) {
    // Error handling
    res.status(500).send({
      error: 'Internal Server Error'
    });
  }
});

// GET endpoint to get all orders
app.get('/orders', (req, res) => {
  res.status(200).send(orders);
});

// GET endpoint to get a specific order by ID
app.get('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (order) {
    res.status(200).send(order);
  } else {
    res.status(404).send({
      error: 'Order not found'
    });
  }
});

// PUT endpoint to update an order
app.put('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (order) {
    // Update the order object with new status
    order.status = req.body.status;
    res.status(200).send(order);
  } else {
    res.status(404).send({
      error: 'Order not found'
    });
  }
});

// DELETE endpoint to delete an order
app.delete('/orders/:id', (req, res) => {
  const index = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (index > -1) {
    orders.splice(index, 1);
    res.status(200).send({
      message: 'Order deleted successfully'
    });
  } else {
    res.status(404).send({
      error: 'Order not found'
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Order processing server listening at http://localhost:${port}`);
});

// Commented out code to handle errors and unhandled rejections
// process.on('unhandledRejection', (reason, promise) => {
//   console.log('Unhandled Rejection at:', promise, 'reason:', reason);
//   // Application specific logging, throwing an error, or other logic here
// });
