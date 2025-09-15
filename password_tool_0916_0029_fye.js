// 代码生成时间: 2025-09-16 00:29:09
const express = require('express');
const crypto = require('crypto');

// 创建一个 Express 应用
const app = express();
const port = 3000;

// 解析 JSON 请求体
app.use(express.json());

// 密码加密的路由
app.post('/hash-password', (req, res) => {
  // 获取密码和盐值
  const { password, salt } = req.body;
  // 检查密码和盐值是否被提供
  if (!password || !salt) {
    return res.status(400).json({
      error: 'Password and salt are required'
    });
  }
  // 使用 crypto 创建 hash
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  // 返回加密后的密码
  res.json({ hash });
});

// 密码验证的路由
app.post('/verify-password', (req, res) => {
  // 获取密码、盐值和加密后的密码
  const { password, salt, hash } = req.body;
  // 检查密码、盐值和加密后的密码是否被提供
  if (!password || !salt || !hash) {
    return res.status(400).json({
      error: 'Password, salt, and hash are required'
    });
  }
  // 创建新的 hash 用于验证
  const newHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  // 比较新 hash 和提供的 hash
  if (newHash === hash) {
    res.json({ isValid: true });
  } else {
    res.status(401).json({ isValid: false });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Password tool app listening at http://localhost:${port}`);
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An internal error occurred' });
});

// 代码注释：
// - 使用 crypto 模块的 pbkdf2Sync 函数进行密码的哈希处理。
// - 使用 express 框架创建 RESTful API。
// - 提供了两个 API 端点：'/hash-password' 用于加密密码，'/verify-password' 用于验证密码。
// - 错误处理确保任何服务器错误都会返回 500 状态码和相关错误信息。