// 代码生成时间: 2025-08-09 20:52:04
const express = require('express');
const app = express();
const port = 3000;

// 允许跨域请求
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// 中间件，解析JSON请求体
app.use(express.json());

/**
 * POST请求处理函数，用于接收JSON数据并转换
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
app.post('/transform', (req, res) => {
  try {
    // 检查请求体中是否有data字段
    if (!req.body || !req.body.data) {
      return res.status(400).json({ error: 'No data provided' });
    }

    // 将输入的JSON数据转换为大写
    const transformedData = JSON.stringify(req.body.data).toUpperCase();

    // 返回转换后的数据
    res.status(200).json({ transformedData });
  } catch (error) {
    // 错误处理
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`JSON Transformer is running on port ${port}`);
});