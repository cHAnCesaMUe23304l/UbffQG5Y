// 代码生成时间: 2025-09-01 16:01:33
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs').promises;

// Create an Express application.
const app = express();
const port = 3000;

// Configure Multer for file uploading.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to resize an image.
async function resizeImage(buffer, width, height) {
  try {
    // Use sharp to resize the image.
    const resizedBuffer = await sharp(buffer)
      .resize({ width, height })
      .toBuffer();
    return resizedBuffer;
  } catch (error) {
    // Handle any errors that occur during resizing.
    throw new Error(`Error resizing image: ${error.message}`);
  }
}

// Route to handle POST request for image resizing.
app.post('/resize', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const { width, height } = req.body;
    if (typeof width !== 'number' || typeof height !== 'number') {
      return res.status(400).send('Invalid dimensions provided.');
    }

    // Resize the image.
    const resizedBuffer = await resizeImage(req.file.buffer, width, height);

    // Send the resized image as a response.
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(resizedBuffer);
  } catch (error) {
    // Send an error response if any error occurs.
    res.status(500).send(error.message);
  }
});

// Start the Express server.
app.listen(port, () => {
  console.log(`Image resizing server listening at http://localhost:${port}`);
});