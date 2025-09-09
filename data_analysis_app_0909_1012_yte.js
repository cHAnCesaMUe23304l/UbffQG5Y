// 代码生成时间: 2025-09-09 10:12:37
// 引入必要的模块
const express = require('express');
const app = express();
const port = 3000;

// 中间件：解析JSON请求体
app.use(express.json());

// 数据统计分析函数
function analyzeData(data) {
  // 假设data是一个包含数字的数组
  if (!Array.isArray(data) || !data.every(Number.isFinite)) {
    throw new Error('Invalid data format');
  }

  // 计算平均值
  const mean = data.reduce((acc, val) => acc + val, 0) / data.length;

  // 计算标准差
  const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length;
  const stdDeviation = Math.sqrt(variance);

  // 返回分析结果
  return { mean, stdDeviation };
}

// 路由：接收数据并返回分析结果
app.post('/analyze', (req, res) => {
  try {
    // 检查请求体是否包含数据
    if (!req.body.data) {
      return res.status(400).json({
        error: 'No data provided'
      });
    }

    // 调用数据分析函数并返回结果
    const result = analyzeData(req.body.data);
    res.json(result);
  } catch (error) {
    // 错误处理
    res.status(500).json({
      error: error.message
    });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`数据分析器程序运行在 http://localhost:${port}`);
});