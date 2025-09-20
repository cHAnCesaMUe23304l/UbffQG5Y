// 代码生成时间: 2025-09-20 12:50:45
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Function to read directory and copy files
function backupDirectory(sourcePath, targetPath) {
  try {
    const files = fs.readdirSync(sourcePath);
    files.forEach(file => {
      const source = path.join(sourcePath, file);
      const target = path.join(targetPath, file);

      if (fs.lstatSync(source).isDirectory()) {
        if (!fs.existsSync(target)) {
          fs.mkdirSync(target);
        }
        backupDirectory(source, target);
      } else {
        fs.copyFileSync(source, target);
      }
    });
  } catch (error) {
    console.error('Error during backup:', error);
    throw error;
  }
}

// Endpoint to start backup
app.post('/backup', (req, res) => {
  const { sourcePath, targetPath } = req.body;
  if (!sourcePath || !targetPath) {
    return res.status(400).json({
      error: 'Source and target paths are required'
    });
  }
  try {
    backupDirectory(sourcePath, targetPath);
    res.json({
      message: 'Backup completed successfully'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error during backup'
    });
  }
});

// Endpoint to check if files are in sync
app.post('/sync', (req, res) => {
  const { sourcePath, targetPath } = req.body;
  if (!sourcePath || !targetPath) {
    return res.status(400).json({
      error: 'Source and target paths are required'
    });
  }
  try {
    const sourceFiles = fs.readdirSync(sourcePath);
    const targetFiles = fs.readdirSync(targetPath);
    const isSynced = sourceFiles.length === targetFiles.length &&
                      sourceFiles.every(file => targetFiles.includes(file));
    res.json({
      synced: isSynced,
      message: isSynced ? 'Files are in sync' : 'Files are not in sync'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error during sync check'
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`File backup and sync tool running on port ${port}`);
});