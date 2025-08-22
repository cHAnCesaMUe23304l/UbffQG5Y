// 代码生成时间: 2025-08-22 12:46:54
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to handle the file renaming request
app.post('/rename-files', async (req, res) => {
  // Check if the file paths and new name are provided
  if (!req.body.filePaths || !req.body.newName) {
    return res.status(400).json({
      error: 'Please provide both filePaths and newName in the request body.'
    });
  }

  // Destructure filePaths and newName from the request body
  const { filePaths, newName } = req.body;

  try {
    // Loop through each file path and rename the file
    for (let oldPath of filePaths) {
      const oldPathAbsolute = path.resolve(oldPath);
      const newNameAbsolute = path.join(path.dirname(oldPathAbsolute), newName);
      // Check if the file exists before renaming
      if (!fs.existsSync(oldPathAbsolute)) {
        throw new Error(`File ${oldPath} does not exist.`);
      }
      // Rename the file
      fs.renameSync(oldPathAbsolute, newNameAbsolute);
    }
    // Return success message
    return res.status(200).json({
      message: 'Files renamed successfully.'
    });
  } catch (error) {
    // Error handling
    return res.status(500).json({
      error: error.message
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Batch file rename tool running on port ${port}`);
});

// Module documentation
/**
 * @module batch_rename_tool
 *
 * This module provides a simple Express-based API endpoint to rename multiple files at once.
 *
 * @example
 * // To rename files, send a POST request to /rename-files with the following JSON body:
 * // {
 * //   "filePaths": ["./path/to/file1.txt", "./path/to/file2.txt"],
 * //   "newName": "newFileName.txt"
 * // }
 *
 * // The API will rename all files in the filePaths array to the new name specified.
 * // It will return a success message or an error message based on the outcome.
 *
 * @listens POST /rename-files
 */