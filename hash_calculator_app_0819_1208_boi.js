// 代码生成时间: 2025-08-19 12:08:02
const express = require('express');
const crypto = require('crypto');

// 创建Express应用
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件，用于解析JSON请求体
app.use(express.json());

// 路由：计算哈希值
app.post('/hash', (req, res) => {
  // 检查输入数据
  if (!req.body.data) {
    return res.status(400).json({
      error: 'No data provided'
    });
  }
  
  // 检查哈希算法是否存在
  if (!crypto.getHashes().includes(req.body.algorithm)) {
    return res.status(400).json({
      error: 'Invalid hash algorithm'
    });
  }
  
  // 计算哈希值
  const hash = crypto.createHash(req.body.algorithm).update(req.body.data).digest('hex');
  
  // 返回哈希值
  res.json({
    hash: hash
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error'
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 代码注释：
// 该程序是一个简单的哈希值计算工具，使用Express框架和Node.js的crypto模块。
// 用户可以通过POST请求到'/hash'端点，并在请求体中提供数据和哈希算法名称，
// 服务器将计算并返回相应的哈希值。
// 如果请求无效或算法不存在，服务器将返回错误信息。
// 程序还包括一个错误处理中间件，用于捕获并处理未预料到的错误。