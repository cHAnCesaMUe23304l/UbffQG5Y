// 代码生成时间: 2025-09-22 15:31:39
const express = require('express');
const fs = require('fs');
const path = require('path');

// 创建 Express 应用
const app = express();
const PORT = 3000;

// 中间件，用于解析 JSON 格式的请求体
app.use(express.json());

// 路由：获取文件夹结构
app.get('/api/folder-structure/:folderPath', (req, res) => {
  const folderPath = req.params.folderPath;

  // 读取文件夹路径
  fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      // 错误处理
      return res.status(500).json({
        error: 'Failed to read folder structure',
        message: err.message
      });
    }

    // 构建文件夹结构对象
    const folderStructure = files.map(file => {
      return file.isDirectory() ? {
        name: file.name,
        type: 'directory',
        content: []
      } : {
        name: file.name,
        type: 'file',
        content: null
      };
    });

    // 递归填充文件夹结构
    const buildStructure = (filePath, structure) => {
      fs.readdir(filePath, { withFileTypes: true }, (err, files) => {
        if (err) {
          return res.status(500).json({
            error: 'Failed to read folder structure',
            message: err.message
          });
        }

        files.forEach(file => {
          if (file.isDirectory()) {
            const dirPath = path.join(filePath, file.name);
            const dirStructure = structure.find(item => item.name === file.name);
            dirStructure.content = buildStructure(dirPath, [{
              name: file.name,
              type: 'directory',
              content: []
            }]);
          } else {
            structure.push({
              name: file.name,
              type: 'file',
              content: null
            });
          }
        });
      });
    };

    // 填充第一个目录的内容
    buildStructure(folderPath, folderStructure);

    // 返回文件夹结构
    res.json(folderStructure);
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// 监听端口
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});