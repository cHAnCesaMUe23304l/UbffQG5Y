// 代码生成时间: 2025-09-21 00:07:46
const express = require('express');
const fs = require('fs');
const path = require('path');

// 创建Express应用
const app = express();
const port = 3000;

// 定义中间件解析JSON请求体
app.use(express.json());

// 定义路由处理GET请求，用于获取文件夹信息
app.get('/api/folders/:folderPath', (req, res) => {
  const folderPath = req.params.folderPath;
  try {
    // 检查路径是否存在
    if (!fs.existsSync(folderPath)) {
      return res.status(404).json({
        error: 'Folder path does not exist'
      });
    }
    // 获取文件夹内容
    const filesAndFolders = fs.readdirSync(folderPath, { withFileTypes: true });
    // 过滤出文件
    const files = filesAndFolders.filter(item => item.isFile());
    // 过滤出文件夹
    const folders = filesAndFolders.filter(item => item.isDirectory());
    // 返回结果
    res.json({
      files,
      folders
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// 定义路由处理POST请求，用于整理文件夹
app.post('/api/organize/:folderPath', (req, res) => {
  const folderPath = req.params.folderPath;
  const {
    files: filesPattern,
    folders: foldersPattern
  } = req.body;
  try {
    // 检查路径是否存在
    if (!fs.existsSync(folderPath)) {
      return res.status(404).json({
        error: 'Folder path does not exist'
      });
    }
    // 整理文件和文件夹
    organizeFolder(folderPath, filesPattern, foldersPattern);
    // 返回整理结果
    res.json({
      message: 'Folder organized successfully'
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// 文件夹整理函数
function organizeFolder(folderPath, filesPattern, foldersPattern) {
  fs.readdirSync(folderPath, { withFileTypes: true }).forEach(item => {
    if (item.isFile()) {
      // 根据文件模式匹配并重命名文件
      if (filesPattern.test(item.name)) {
        const newFileName = item.name.replace(filesPattern, foldersPattern);
        fs.renameSync(path.join(folderPath, item.name), path.join(folderPath, newFileName));
      }
    } else if (item.isDirectory()) {
      // 根据文件夹模式匹配并重命名文件夹
      if (foldersPattern.test(item.name)) {
        const newFolderName = item.name.replace(foldersPattern, filesPattern);
        fs.renameSync(path.join(folderPath, item.name), path.join(folderPath, newFolderName));
      }
    }
  });
}

// 启动服务器
app.listen(port, () => {
  console.log(`Folder Organizer App listening at http://localhost:${port}`);
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong'
  });
});

// 注意：
// - 此代码假设'filesPattern'和'foldersPattern'是以正则表达式格式提供的，
//   分别用于匹配想要整理的文件和文件夹的名称。
// - 'organizeFolder'函数会根据提供的模式匹配并重命名匹配的文件和文件夹。
// - 该程序仅用于演示，实际部署时需要更多的安全考虑和错误处理。