// 代码生成时间: 2025-09-09 01:25:46
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

// 创建一个Express应用
const app = express();
const PORT = process.env.PORT || 3000;

// 配置Multer存储
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 路由：上传图片
app.post('/upload', upload.single('image'), async (req, res) => {
  // 检查是否上传了文件
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // 读取图片缓冲区
    const imageBuffer = req.file.buffer;
    // 调整图片尺寸
    const resizedImage = await sharp(imageBuffer)
      .resize({ width: 300, height: 300 })
      .toBuffer();
    // 将调整后的图片以新的文件名保存
    const newFileName = `resized_${req.file.originalname}`;
    const filePath = path.join(__dirname, 'uploads', newFileName);
    await sharp(resizedImage).toFile(filePath);
    // 返回新文件的路径
    res.json({
      message: 'Image resized successfully',
      resizedImagePath: `/uploads/${newFileName}`
    });
  } catch (error) {
    // 错误处理
    res.status(500).json({ error: error.message });
  }
});

// 路由：获取调整后的图片
app.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);
  res.sendFile(filePath);
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 注意：确保在项目根目录下创建一个名为uploads的文件夹以存储调整后的图片
