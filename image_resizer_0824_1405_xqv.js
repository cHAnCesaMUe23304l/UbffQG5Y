// 代码生成时间: 2025-08-24 14:05:17
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// 创建Express应用
const app = express();
// 设置端口
const PORT = process.env.PORT || 3000;

// 配置Multer存储引擎
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${path.extname(file.originalname)}`);
  }
});

// 初始化Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 限制文件大小为10MB
});

// 路由：上传图片
app.post('/upload', upload.array('images'), async (req, res) => {
  try {
    // 检查是否上传了文件
    if (req.files.length === 0) {
      return res.status(400).json({
        error: 'No files were uploaded.'
      });
    }

    // 存储原始图片
    const originalImages = req.files.map(file => file.path);
    const resizedImages = [];

    // 遍历文件并调整尺寸
    for (const image of originalImages) {
      const outputPath = path.join(__dirname, 'resized', path.basename(image));
      await sharp(image)
        .resize(800, 600) // 设置新的宽度和高度
        .toFile(outputPath)
        .then(() => resizedImages.push(outputPath));
    }

    // 返回调整后的图片路径
    res.json({
      success: true,
      resizedImages
    });
  } catch (error) {
    // 错误处理
    res.status(500).json({
      error: 'An error occurred while processing the images.'
    });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'An internal server error occurred.'
  });
});