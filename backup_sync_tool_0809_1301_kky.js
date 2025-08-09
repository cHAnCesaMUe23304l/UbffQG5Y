// 代码生成时间: 2025-08-09 13:01:44
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// 定义备份源和目标文件夹路径
const sourceFolderPath = 'path/to/source/folder';
const targetFolderPath = 'path/to/target/folder';

// 中间件，用于解析JSON请求体
app.use(express.json());

// API端点：备份文件
app.post('/api/backup', async (req, res) => {
    try {
        // 读取源文件夹内容
        const files = await fs.promises.readdir(sourceFolderPath);

        // 遍历文件，复制到目标文件夹
        for (const file of files) {
            const sourceFilePath = path.join(sourceFolderPath, file);
            const targetFilePath = path.join(targetFolderPath, file);

            // 检查文件是否已存在
            if (!fs.existsSync(targetFilePath)) {
                // 创建读取和写入流
                const readStream = fs.createReadStream(sourceFilePath);
                const writeStream = fs.createWriteStream(targetFilePath);

                // 通过管道传输数据
                readStream.pipe(writeStream);
            } else {
                console.log('File already exists:', targetFilePath);
            }
        }

        res.status(200).send({ message: 'Backup completed successfully' });
    } catch (error) {
        console.error('Error during backup:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`Backup Sync Tool is running on port ${port}`);
});