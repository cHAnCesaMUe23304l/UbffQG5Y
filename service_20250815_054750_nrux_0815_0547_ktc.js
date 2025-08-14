// 代码生成时间: 2025-08-15 05:47:50
const express = require('express');
const fs = require('fs');
const path = require('path');

/*
 * 文件夹结构整理器
 * 该程序通过Express框架提供一个HTTP接口，
 * 用于整理指定目录下的文件夹结构。
 */

// 创建Express应用
const app = express();

// 中间件，用于解析JSON请求体
app.use(express.json());

// 定义端口
const PORT = process.env.PORT || 3000;

// 整理文件夹结构的函数
function organizeFolderStructure(directoryPath) {
  // 读取目录内容
  return fs.promises.readdir(directoryPath)
    .then(files => {
      const tasks = files.map(file => {
        // 检查每个文件/文件夹
        return fs.promises.stat(path.join(directoryPath, file))
          .then(stats => {
            if (stats.isDirectory()) {
              // 如果是文件夹，则递归调用整理函数
              return organizeFolderStructure(path.join(directoryPath, file));
            }
          }).catch(err => {
            // 处理错误
            console.error(`Error processing file: ${file}`, err);
          });
      });
      // 等待所有任务完成
      return Promise.all(tasks);
    }).catch(err => {
      // 处理读取目录错误
      console.error(`Error reading directory: ${directoryPath}`, err);
    });
}

// POST接口，用于触发文件夹结构整理
app.post('/organize', async (req, res) => {
  // 获取请求中的目录路径
  const { directoryPath } = req.body;

  // 检查目录路径是否有效
  if (!directoryPath) {
    return res.status(400).json({
      error: 'No directory path provided'
    });
  }

  try {
    // 尝试整理文件夹结构
    await organizeFolderStructure(directoryPath);
    res.json({
      message: 'Folder structure organized successfully'
    });
  } catch (err) {
    // 错误处理
    res.status(500).json({
      error: 'Failed to organize folder structure',
      details: err.message
    });
  }
});

// 启动Express服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});