// 代码生成时间: 2025-08-12 08:03:44
const express = require('express');
const { createGunzip } = require('zlib');
const { pipeline } = require('stream');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// 文件上传的中间件
const fileUpload = express.raw({ type: 'application/octet-stream' });

// 解压文件的函数
async function unzipFile(inputStream, outputPath) {
  try {
    // 创建解压流
    const unzipStream = createGunzip();

    // 使用pipeline来处理解压和文件写入
    await pipeline(
      inputStream,
      unzipStream,
      fs.createWriteStream(outputPath),
      (err) => {
        if (err) {
          throw err;
        }
      }
    );

    console.log('File successfully unzipped.');
  } catch (err) {
    console.error('Error unzipping file:', err.message);
    throw err;
  }
}

// 路由处理文件解压
app.post('/unzip', fileUpload, async (req, res) => {
  try {
    // 检查是否有文件上传
    if (!req.body) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileName = `unzipped_${Date.now()}.zip`; // 解压后的文件名
    const outputPath = path.join(__dirname, 'uploads', fileName); // 输出路径

    // 调用解压函数
    await unzipFile(req.body, outputPath);

    // 返回成功响应
    res.status(200).json({ message: 'File successfully unzipped', outputPath });
  } catch (error) {
    // 错误处理
    res.status(500).json({ message: 'Error processing request', error: error.message });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Unzip tool server running at http://localhost:${port}`);
});

// 文件夹上传目录
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
  fs.mkdirSync(path.join(__dirname, 'uploads'), { recursive: true });
}

// 以上代码实现了一个简单的文件解压工具，使用express框架处理HTTP请求。
// 该工具允许用户上传压缩文件，并将其解压到服务器的指定目录。
// 代码中包含了错误处理和日志记录，以便于调试和维护。