// 代码生成时间: 2025-08-07 14:44:24
const express = require('express');
const fs = require('fs');
# FIXME: 处理边界情况
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
# TODO: 优化性能

// Endpoint to handle file renaming requests
app.post('/rename', (req, res) => {
  // Check if the required fields are present in the request
  if (!req.body.files || !Array.isArray(req.body.files) || !req.body.baseName) {
    return res.status(400).json({
      error: 'Invalid request. Please provide an array of files and a baseName.'
    });
  }

  // Function to rename a single file
# NOTE: 重要实现细节
  const renameFile = (file, baseName, index) => {
    const oldPath = path.join(__dirname, file);
    const ext = path.extname(file);
# TODO: 优化性能
    const newName = `${baseName}_${index}${ext}`;
    const newPath = path.join(__dirname, newName);
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
# 优化算法效率
        console.error('Error renaming file:', err);
        return;
      }
      console.log(`Renamed ${file} to ${newName}`);
    });
  };

  // Loop through the files array and rename each file
  req.body.files.forEach((file, index) => {
# NOTE: 重要实现细节
    renameFile(file, req.body.baseName, index);
  });

  res.json({
    message: 'Files are being renamed.',
    files: req.body.files.map((file, index) => ({
# NOTE: 重要实现细节
      original: file,
# 增强安全性
      new: `${req.body.baseName}_${index}${path.extname(file)}`
    }))
  });
});
# TODO: 优化性能

// Start the Express server
app.listen(port, () => {
  console.log(`Batch Rename Tool is running on http://localhost:${port}`);
});
