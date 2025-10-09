// 代码生成时间: 2025-10-09 20:55:49
const express = require('express');
const app = express();
const PORT = 3000;

// 定义游戏资源
const gameResources = {
  wood: 100,
  stone: 50,
  metal: 30,
};

// 用于同步访问资源对象的中间件
app.use(express.json());

// 获取游戏资源
app.get('/resources', (req, res) => {
  try {
    // 直接返回当前的游戏资源状态
    res.status(200).json(gameResources);
  } catch (error) {
    // 错误处理
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
    });
  }
});

// 更新游戏资源
app.post('/resources/update', (req, res) => {
  try {
    const { resource, amount } = req.body;
    // 检查请求是否包含必要的参数
    if (!resource || !amount) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Resource and amount must be provided.',
      });
    }
    // 更新资源
    if (gameResources.hasOwnProperty(resource)) {
      gameResources[resource] += amount;
      res.status(200).json(gameResources);
    } else {
      // 如果请求的资源不存在
      res.status(404).json({
        error: 'Not Found',
        message: `Resource '${resource}' does not exist.`,
      });
    }
  } catch (error) {
    // 错误处理
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
    });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Game resource management server is running on port ${PORT}`);
});

// 注意：这个简单的实现没有考虑并发问题和持久化存储。
// 在生产环境中，可能需要引入数据库和锁机制来确保数据的一致性。