// 代码生成时间: 2025-08-28 16:25:16
 * It provides a single endpoint that accepts URL parameters and returns
 * a JSON response indicating the validity of the URL.
 *
 * Usage:
 *   POST /validate - sends a JSON payload with a 'url' field to validate.
 */

const express = require('express');
const validator = require('validator'); // npm install validator

// Initialize Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to validate URLs
app.post('/validate', (req, res) => {
    // Validate the 'url' field in the request body
    if (!req.body.url) {
        // Return an error if 'url' is missing
        return res.status(400).json({
            error: 'Missing URL parameter'
        });
    }

    // Check if the URL is valid using validator library
    const isValid = validator.isURL(req.body.url, { require_protocol: true });

    // Return the validation result
    res.json({
        isValid: isValid,
        url: req.body.url
    });
});

// Set the port for the server
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`URL validator server listening on port ${PORT}`);
});