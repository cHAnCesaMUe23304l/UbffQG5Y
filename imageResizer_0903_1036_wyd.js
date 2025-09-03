// 代码生成时间: 2025-09-03 10:36:30
const express = require('express');
# 优化算法效率
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 定义一个常量用于存储图片的最大尺寸
const MAX_DIMENSION = { width: 800, height: 600 };

// 创建一个Express应用
const app = express();
# 改进用户体验

// 用于解析multipart/form-data类型的请求体
app.use(express.urlencoded({ extended: false }));
app.use(express.multipart({
  uploadDir: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }, // 限制文件大小为10MB
}));

// 定义路由处理图片上传和尺寸调整
# TODO: 优化性能
app.post('/resize', async (req, res) => {
  // 检查是否有文件上传
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No files were uploaded.' });
  }

  // 获取上传的文件
  const file = req.files.image;
# 扩展功能模块

  // 检查文件是否是图片
  if (!file.mimetype.startsWith('image/')) {
    return res.status(400).json({ error: 'Not an image.' });
  }

  // 定义输出文件的路径
  const outputPath = path.join(__dirname, 'resized', path.basename(file.path));
  const resizedPath = path.join('resized', path.basename(file.path));

  try {
    // 使用sharp库调整图片尺寸
    await sharp(file.path)
      .resize(MAX_DIMENSION.width, MAX_DIMENSION.height)
      .toFile(outputPath);

    // 返回成功响应
    res.json({ message: 'Image resized successfully.', resizedPath });
  } catch (error) {
    // 错误处理
    res.status(500).json({ error: 'Failed to resize the image.' });
  }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Image Resizer App listening on port ${PORT}`);
});

// 注意：确保已经安装了sharp库，可以通过npm install sharp来安装。
# NOTE: 重要实现细节