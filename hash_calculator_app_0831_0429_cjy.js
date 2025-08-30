// 代码生成时间: 2025-08-31 04:29:15
const express = require('express');
const crypto = require('crypto');

// 创建Express应用
const app = express();
// 设置端口号
const PORT = 3000;

// 中间件：解析JSON请求体
app.use(express.json());

// 计算哈希值的函数
function calculateHash(data, algorithm) {
  // 根据提供的算法计算哈希值
  return crypto.createHash(algorithm).update(data).digest('hex');
}

// 路由：计算哈希值
app.post('/calculate-hash', (req, res) => {
  // 获取请求体中的数据和算法参数
  const { data, algorithm } = req.body;

  // 错误处理：检查数据和算法参数是否提供
  if (!data || !algorithm) {
    return res.status(400).json({ error: 'Missing data or algorithm' });
  }

  // 错误处理：检查是否支持提供的算法
  if (!crypto.getHashes().includes(algorithm)) {
    return res.status(400).json({ error: 'Unsupported algorithm' });
  }

  // 计算哈希值
  const hash = calculateHash(data, algorithm);

  // 返回计算结果
  res.json({ hash });
});

// 错误处理：捕获未定义路由
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// 错误处理：捕获服务器错误
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Hash calculator app listening on port ${PORT}`);
});