// 代码生成时间: 2025-08-27 06:30:25
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

// 设置存储配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// 创建multer实例
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 限制文件大小 5MB
});

// 创建Express应用
const app = express();

// 中间件，解析JSON和URL编码的表单数据
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由：上传图片
app.post('/upload', upload.array('images'), async (req, res) => {
  try {
    // 检查是否有文件上传
    if (req.files.length === 0) {
      return res.status(400).json({ message: 'No files were uploaded.' });
    }

    // 存储原始图片信息
    const originalFiles = req.files.map(file => ({
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
    }));

    // 处理每张图片，调整尺寸
    const resizedFiles = await Promise.all(req.files.map(async (file) => {
      const outputPath = path.join('resized', path.basename(file.path));
      await sharp(file.path)
        .resize(800, 600) // 调整尺寸到800x600，可根据需求修改
        .toFormat('jpeg') // 转换格式为jpeg，可根据需求修改
        .toFile(outputPath);
      return {
        path: outputPath,
        size: await fs.stat(outputPath).size,
        mimetype: 'image/jpeg',
      };
    }));

    // 返回处理后的图片信息
    res.json({
      originalFiles,
      resizedFiles,
    });
  } catch (error) {
    // 错误处理
    console.error(error);
    res.status(500).json({ message: 'Error processing images.' });
  }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
