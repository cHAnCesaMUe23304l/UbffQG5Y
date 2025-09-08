// 代码生成时间: 2025-09-08 15:59:17
const express = require('express');
const http = require('http');

// Create an Express application
# NOTE: 重要实现细节
const app = express();

// Define the port number
const port = 3000;

// Function to check if a URL is reachable
# 添加错误处理
function checkUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
# NOTE: 重要实现细节
      if (res.statusCode === 200) {
# 优化算法效率
        resolve(true);
# TODO: 优化性能
      } else {
        reject(new Error('URL is not reachable'));
      }
    }).on('error', (err) => {
      reject(err);
# NOTE: 重要实现细节
    });
# 增强安全性
  });
}

// Endpoint to check the network connection status
app.get('/check', async (req, res) => {
  try {
    // Check if a specific URL is reachable, default to http://www.google.com if not provided
    const urlToCheck = req.query.url || 'http://www.google.com';
    const isReachable = await checkUrl(urlToCheck);
    res.status(200).json({
      status: 'success',
# 改进用户体验
      message: isReachable ? 'Network connection is active.' : 'Network connection is down.',
    });
  } catch (error) {
    // Handle any errors that may occur during the check
    res.status(500).json({
      status: 'error',
      message: error.message,
# 添加错误处理
    });
  }
});

// Start the server
app.listen(port, () => {
# 优化算法效率
  console.log(`Network status checker app listening at http://localhost:${port}`);
});
