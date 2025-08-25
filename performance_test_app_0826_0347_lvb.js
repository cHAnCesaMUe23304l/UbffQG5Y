// 代码生成时间: 2025-08-26 03:47:47
const express = require('express');
const app = express();
const port = 3000;

// Middleware to handle JSON request bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('Server is up and running!');
});

// Performance test endpoint
app.get('/test', (req, res) => {
    try {
        // Simulate some processing time
        setTimeout(() => {
            res.status(200).json({ message: 'Performance test successful!' });
        }, 100); // 100ms delay
    } catch (error) {
        console.error('Error during performance test:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Performance test server listening at http://localhost:${port}`);
});