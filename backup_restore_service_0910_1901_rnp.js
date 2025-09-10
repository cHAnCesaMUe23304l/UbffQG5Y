// 代码生成时间: 2025-09-10 19:01:03
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Directory to store backups
const backupDirectory = './backups';

// Ensure backup directory exists
if (!fs.existsSync(backupDirectory)) {
    fs.mkdirSync(backupDirectory);
}

// Route to backup data
app.post('/backup', (req, res) => {
    const { filename } = req.body;
    const backupPath = path.join(backupDirectory, filename);
    
    try {
        // Write data to backup file
        fs.writeFileSync(backupPath, JSON.stringify(req.body.data));
        res.status(201).send({ message: `Backup created at ${backupPath}` });
    } catch (error) {
        res.status(500).send({ error: 'Failed to create backup', message: error.message });
    }
});

// Route to restore data
app.post('/restore', (req, res) => {
    const { filename } = req.body;
    const backupPath = path.join(backupDirectory, filename);
    
    try {
        // Read data from backup file
        const data = fs.readFileSync(backupPath);
        res.status(200).send({ message: `Data restored from ${backupPath}`, data });
    } catch (error) {
        res.status(404).send({ error: 'Backup not found', message: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Backup and restore service running on port ${port}`);
});