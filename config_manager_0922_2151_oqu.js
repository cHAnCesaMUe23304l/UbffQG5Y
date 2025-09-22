// 代码生成时间: 2025-09-22 21:51:56
const express = require('express');
const fs = require('fs');
const path = require('path');

// 创建Express应用
const app = express();
const PORT = process.env.PORT || 3000;

// 配置文件存放的目录
const CONFIG_DIR = path.join(__dirname, 'configs');

// 读取配置文件的中间件
const readConfigFile = (req, res, next) => {
  const { configName } = req.params;
  const configPath = path.join(CONFIG_DIR, `${configName}.json`);

  fs.readFile(configPath, (err, data) => {
    if (err) {
      // 如果文件不存在或者读取发生错误，返回404状态码
      return res.status(404).json({ error: 'Config file not found' });
    }

    // 解析JSON配置文件并传递给下一个中间件
    req.configData = JSON.parse(data);
    next();
  });
};

// 提供配置文件的路由
app.get('/config/:configName', readConfigFile, (req, res) => {
  // 返回配置文件的内容
  res.json(req.configData);
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 注释和文档
/**
 * Config Manager App
 * This Express application provides a simple API to manage and serve configuration files.
 *
 * @author Your Name
 * @version 1.0
 */