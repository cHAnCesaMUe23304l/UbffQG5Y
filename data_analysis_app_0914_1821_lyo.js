// 代码生成时间: 2025-09-14 18:21:44
// data_analysis_app.js

const express = require('express');
const app = express();
const port = 3000;

// 数据分析中间件
const dataAnalysisMiddleware = (req, res, next) => {
  // 这里可以添加数据分析的逻辑
  // 例如：计算请求中数据的平均值、最大值、最小值等
  // 假设req.body包含数据数组
  if (!Array.isArray(req.body)) {
    return res.status(400).json({
      error: 'Invalid data format',
      message: 'Request body should be an array of numbers'
    });
  }

  const data = req.body;
  const sum = data.reduce((acc, val) => acc + val, 0);
  const avg = sum / data.length;
  const max = Math.max(...data);
  const min = Math.min(...data);

  req.analysisResult = {
    sum,
    avg,
    max,
    min
  };

  next();
};

// 数据分析结果路由
app.post('/analyze', dataAnalysisMiddleware, (req, res) => {
  // res.send(req.analysisResult); // 直接返回分析结果
  res.json(req.analysisResult);
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'An unexpected error occurred',
    message: err.message || 'Internal Server Error'
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Data Analysis App listening at http://localhost:${port}`);
});
