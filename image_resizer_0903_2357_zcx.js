// 代码生成时间: 2025-09-03 23:57:04
const express = require('express');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 定义一个常量，用于指定图片大小的默认边界值
const DEFAULT_SIZE = 200;

// 创建一个 Express 应用
const app = express();
const port = 3000;

// 用于存储原始图片文件和调整后的图片文件的文件夹路径
const IMAGES_DIR = path.join(__dirname, 'images');

// 中间件来解析请求体中的JSON数据
app.use(express.json());

// 处理图片上传和尺寸调整的POST请求
app.post('/images/resize', async (req, res) => {
  // 检查是否有文件上传
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      filename: "upload_error",
      code: "No files were uploaded."
    });
  }
  
  // 读取上传的图片文件
  const image = req.files.image;
  // 检查文件类型是否为图片
  if (!image.mimetype.startsWith('image')) {
    return res.status(400).json({
      filename: "upload_error",
      code: "Uploaded file is not an image."
    });
  }
  
  // 定义新图片的名称和路径
  const imageFileName = `resized_${Date.now()}_${path.parse(image.name).name}${path.parse(image.name).ext}`;
  const resizedImagePath = path.join(IMAGES_DIR, imageFileName);
  
  // 使用 sharp 库调整图片尺寸
  try {
    await sharp(image.data)
      .resize(DEFAULT_SIZE)
      .toFile(resizedImagePath);
    
    // 返回新图片文件的路径
    res.json({
      filename: imageFileName,
      code: "Image resized and saved successfully."
    });
  } catch (error) {
    // 错误处理
    console.error("Failed to resize image: ", error);
    return res.status(500).json({
      filename: "resize_error",
      code: "Failed to resize image."
    });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Image Resizer app listening at http://localhost:${port}`);
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 以下注释说明了代码中使用的关键点和最佳实践
// - 使用 async/await 处理异步操作，提高代码的可读性
// - 使用 try/catch 块进行错误处理
// - 使用 express.json() 中间件来解析 JSON 请求体
// - 上传文件的处理和验证
// - 使用 sharp 库来执行图片尺寸调整工作
// - 定义默认的图片尺寸和文件存储路径
// - 返回清晰的错误信息和成功的响应
// - 服务器的启动和错误处理中间件的设置