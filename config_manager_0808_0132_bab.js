// 代码生成时间: 2025-08-08 01:32:55
const express = require('express');
const fs = require('fs');
const path = require('path');

// 创建一个 Express 应用
const app = express();
const port = 3000;

// 存储配置文件对象
const configStore = {};

// 中间件来解析JSON请求体
app.use(express.json());

// GET路由，获取所有配置文件
app.get('/config', (req, res) => {
  try {
    // 读取配置文件目录
    fs.readdirSync('./configs').forEach(file => {
      // 读取每个文件的内容，并存入configStore对象
      configStore[file] = fs.readFileSync(path.join('./configs', file), 'utf-8');
    });
    // 返回配置文件对象
    res.json(configStore);
  } catch (error) {
    // 错误处理
    res.status(500).json({ error: 'Failed to read config files' });
  }
});

// POST路由，添加或更新配置文件
app.post('/config/:filename', (req, res) => {
  const { filename } = req.params;
  const { config } = req.body;
  try {
    // 将配置写入文件
    fs.writeFileSync(path.join('./configs', filename), JSON.stringify(config, null, 2));
    // 返回成功消息
    res.status(201).json({ message: 'Config file updated successfully' });
  } catch (error) {
    // 错误处理
    res.status(500).json({ error: 'Failed to write config file' });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Config Manager running on port ${port}`);
});

// 模块化导出，以便其他文件可以导入和使用这个配置管理器
module.exports = app;