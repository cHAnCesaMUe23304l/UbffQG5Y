// 代码生成时间: 2025-08-13 18:49:29
const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 3000;

// 密码加密
app.get('/encrypt', (req, res) => {
  const { password } = req.query;
  
  if (!password) {
    res.status(400).json({ error: 'Missing password' });
    return;
  }
  
  const encrypted = crypto.createHash('sha256').update(password).digest('hex');
  res.json({ encrypted });
});

// 密码解密（这里假设我们保存了解密所需的密钥或者信息）
// 注意：实际中，SHA-256加密是不可逆的，因此这里只是模拟解密过程
app.get('/decrypt', (req, res) => {
  const { encrypted } = req.query;
  
  if (!encrypted) {
    res.status(400).json({ error: 'Missing encrypted password' });
    return;
  }
  
  // 这里我们假设有一个保存原始密码的数据库或者某种机制来解密
  // 由于SHA-256是不可逆的，这里只是模拟返回原始密码
  res.json({ password: 'your-plaintext-password' });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Password encrypt/decrypt app listening at http://localhost:${port}`);
});