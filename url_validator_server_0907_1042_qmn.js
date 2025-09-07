// 代码生成时间: 2025-09-07 10:42:54
const express = require('express');
const { URL } = require('url'); // 引入内置的 URL 类型检查

// 创建 Express 应用
const app = express();
const port = 3000;

// 中间件，用于解析 JSON 格式的请求体
app.use(express.json());

// URL 验证的路由
app.post('/validate-url', (req, res) => {
  // 检查请求体中是否有 url 字段
  if (!req.body.url) {
    return res.status(400).json({
      error: 'Missing url parameter in the request body'
    });
  }

  // 尝试解析 URL
  try {
    new URL(req.body.url);
    return res.status(200).json({
      isValid: true,
      message: 'The URL is valid.'
    });
  } catch (error) {
    // 如果 URL 解析失败，则返回错误信息
    return res.status(400).json({
      isValid: false,
      message: 'The URL is not valid.'
    });
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'An unexpected error occurred.'
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`URL Validator server listening at http://localhost:${port}`);
});

// 代码注释：
// - 我们使用 Express 框架创建了一个简单的服务器。
// - 通过 POST 方法在 '/validate-url' 路由上接收 JSON 格式的请求体。
// - 请求体必须包含一个 'url' 字段。
// - 使用 JavaScript 的内置 URL 类型检查 URL 的有效性。
// - 如果 URL 有效，返回 200 状态码和验证信息；如果无效，返回 400 状态码和错误信息。
// - 添加了一个错误处理中间件来捕获并处理未预期的错误。