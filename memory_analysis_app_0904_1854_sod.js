// 代码生成时间: 2025-09-04 18:54:30
 * This Express application provides a simple interface to analyze memory usage.
 * @author Your Name
 * @version 1.0.0
 */

const express = require('express');
const os = require('os');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to get the memory usage
app.get('/memory', (req, res) => {
  try {
    // Get the free and total memory in MB
    const freeMemMB = os.freemem() / (1024 * 1024);
    const totalMemMB = os.totalmem() / (1024 * 1024);
    const usedMemMB = totalMemMB - freeMemMB;

    // Respond with the memory usage data
    res.json({
      freeMemory: freeMemMB,
      totalMemory: totalMemMB,
      usedMemory: usedMemMB
    });
  } catch (error) {
    // Handle any errors that occur during the memory check
    console.error('Error retrieving memory usage:', error);
    res.status(500).json({ error: 'Failed to retrieve memory usage.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Memory Analysis Application listening at http://localhost:${port}`);
});
