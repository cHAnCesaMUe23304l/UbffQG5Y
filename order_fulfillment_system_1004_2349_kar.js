// 代码生成时间: 2025-10-04 23:49:47
// Import required modules
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse request body
app.use(express.json());

// Sample order data
let orders = [];

// Function to create a new order
function createOrder(orderData) {
    const newOrder = {
        id: orders.length + 1, // Simple ID generation
        ...orderData
    };
    orders.push(newOrder);
    return newOrder;
}

// Function to fulfill an order
function fulfillOrder(orderId) {
    const order = orders.find(o => o.id === parseInt(orderId));
    if (!order) {
        throw new Error('Order not found');
    }
    order.status = 'fulfilled'; // Update order status
    return order;
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// GET endpoint to retrieve all orders
app.get('/orders', (req, res) => {
    res.json(orders);
});

// POST endpoint to create a new order
app.post('/orders', (req, res) => {
    try {
        const orderData = req.body;
        if (!orderData) {
            return res.status(400).send('Invalid order data');
        }
        const order = createOrder(orderData);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// PATCH endpoint to fulfill an order
app.patch('/orders/:id/fulfill', (req, res) => {
    try {
        const orderId = req.params.id;
        const fulfilledOrder = fulfillOrder(orderId);
        res.json(fulfilledOrder);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Order Fulfillment System listening at http://localhost:${port}`);
});