// 代码生成时间: 2025-08-12 13:40:13
const express = require('express');
const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route to handle generating an Excel file
app.post('/generate-excel', (req, res) => {
  // Check if the request body contains the required data
  if (!req.body || !req.body.data || !Array.isArray(req.body.data)) {
    return res.status(400).json({
      error: 'Invalid data provided'
    });
  }

  // Convert the data to an Excel file
  try {
    const excelData = [];
    const headers = Object.keys(req.body.data[0]);

    // Add headers to the excel data
    excelData.push(headers);

    // Add the data rows
    req.body.data.forEach(row => {
      const dataRow = headers.map(header => row[header]);
      excelData.push(dataRow);
    });

    // Write the Excel file to the response
    const buffer = xlsx.build([excelData]);
    res.setHeader('Content-Disposition', 'attachment; filename=generated_excel.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.end(buffer);
  } catch (error) {
    console.error('Error generating Excel file:', error);
    return res.status(500).json({
      error: 'Error generating Excel file'
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Excel generator app listening at http://localhost:${PORT}`);
});

// Documentation
// This application uses Express.js and node-xlsx to generate Excel files from JSON data.
// It listens for POST requests on the '/generate-excel' route with JSON body containing an array of objects.
// Each object represents a row in the Excel sheet, and the keys of the first object define the headers.
// The server responds with the Excel file as an attachment, with proper headers for download.
