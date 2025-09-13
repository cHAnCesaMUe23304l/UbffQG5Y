// 代码生成时间: 2025-09-13 15:47:09
const express = require('express');
const unzipper = require('unzipper');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// 定义一个函数来处理文件上传和解压
const handleUnzip = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({
      message: 'No files were uploaded.'
    });
  }

  const file = req.files.file;
  const tempPath = file.path;
  const targetPath = path.join(__dirname, 'uploads', `${Date.now()}-${file.originalname}`);

  try {
    // 确保uploads文件夹存在
    if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
      fs.mkdirSync(path.join(__dirname, 'uploads'), { recursive: true });
    }

    // 移动文件到uploads目录
    await file.mv(targetPath);
    // 解压文件
    await new Promise((resolve, reject) => {
      fs.createReadStream(targetPath)
        .pipe(unzipper.Extract({ path: path.join(__dirname, 'unzipped') }));

      fs.unlink(tempPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    res.send({
      message: 'File uploaded and extracted successfully.',
      originalName: file.originalname,
      targetPath: targetPath
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error occurred during file upload or extraction',
      error: error.message
    });
  }
};

// 配置文件上传
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/files', express.static(path.join(__dirname, 'unzipped')));
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
  limit: '10mb'
}));
app.use(multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 }, // 限制文件大小为100MB
}));

// 路由：文件上传和解压
app.post('/upload', handleUnzip);

// 启动服务器
app.listen(port, () => {
  console.log(`Unzip tool app listening at http://localhost:${port}`);
});

// 错误处理中间件
app.use(function (err, req, res, next) {
  if (err.message.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).send({
      message: 'File size limit exceeded',
    });
  }
  next(err);
});

// 以上代码实现了一个简单的文件上传和解压工具。用户可以通过POST请求到/upload端点上传压缩文件，
// 服务器将文件保存在uploads目录，然后解压到unzipped目录。