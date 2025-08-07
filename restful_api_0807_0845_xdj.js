// 代码生成时间: 2025-08-07 08:45:54
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Define a data structure to store items
let items = [];

// GET endpoint to retrieve all items
app.get('/items', (req, res) => {
    res.status(200).json({
        success: true,
        items: items
    });
});

// POST endpoint to create a new item
app.post('/items', (req, res) => {
    const item = req.body;
    if (!item.name || !item.description) {
        return res.status(400).json({
            success: false,
            message: 'Item name and description are required'
        });
    }
    items.push(item);
    res.status(201).json({
        success: true,
        message: 'Item created successfully',
        item: item
    });
});

// PUT endpoint to update an existing item
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const item = req.body;
    const index = items.findIndex(i => i.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Item with id ${id} not found`
        });
    }
    if (!item.name || !item.description) {
        return res.status(400).json({
            success: false,
            message: 'Item name and description are required'
        });
    }
    items[index] = item;
    res.status(200).json({
        success: true,
        message: 'Item updated successfully',
        item: item
    });
});

// DELETE endpoint to delete an item
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    const index = items.findIndex(i => i.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Item with id ${id} not found`
        });
    }
    items.splice(index, 1);
    res.status(200).json({
        success: true,
        message: 'Item deleted successfully'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'An error occurred while processing your request'
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});