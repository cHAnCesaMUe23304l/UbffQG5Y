// 代码生成时间: 2025-08-07 00:25:25
const express = require('express');
const { URL } = require('url');
const app = express();
const port = 3000;

// 尝试解析给定的URL地址并验证其有效性
const isValidUrl = (str) => {
  try {
    new URL(str);
    return true;
  } catch (e) {
    return false;
  }
};

// 定义POST请求处理函数，用于验证URL链接有效性
app.post('/validate-url', (req, res) => {
  const { url } = req.body;
  // 检查请求体中是否包含url字段
  if (!url) {
    return res
      .status(400)
      .json({
        error: 'Missing url in request body'
      });
  }
  // 验证URL是否有效
  const isValid = isValidUrl(url);
  // 返回验证结果
  res.json({
    isValid,
    message: isValid ? 'URL is valid' : 'URL is invalid'
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`URL Validator app listening at http://localhost:${port}`);
});