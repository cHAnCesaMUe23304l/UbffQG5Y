// 代码生成时间: 2025-10-01 19:36:41
 * This server listens for device status updates and provides an endpoint for
 * checking the status of devices.
 *
 * @version 1.0.0
 */

const express = require('express');
const app = express();
const port = 3000;

// Mock database for device status
let deviceStatusDatabase = {};

// Middleware to parse JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to update device status
app.post('/update-status', (req, res) => {
  "use strict";
  // Extract device ID and status from request body
  const deviceId = req.body.deviceId;
  const status = req.body.status;

  // Error handling
  if (!deviceId || !status) {
    return res.status(400).json({
      error: 'Device ID and status are required.'
    });
  }

  // Update device status in the mock database
  deviceStatusDatabase[deviceId] = status;
  res.status(200).json({
    message: 'Device status updated successfully.',
    deviceId: deviceId,
    status: status
  });
});

// Endpoint to retrieve device status
app.get('/status/:deviceId', (req, res) => {
  "use strict";
  // Extract device ID from URL parameters
  const deviceId = req.params.deviceId;

  // Check if device exists in the database
  if (deviceStatusDatabase[deviceId]) {
    res.status(200).json({
      deviceId: deviceId,
      status: deviceStatusDatabase[deviceId]
    });
  } else {
    res.status(404).json({
      error: 'Device not found.'
    });
  }
});

// Start the server
app.listen(port, () => {
  "use strict";
  console.log(`Device Status Monitor server listening at http://localhost:${port}`);
});
