// 代码生成时间: 2025-09-08 03:33:50
const express = require('express');
const app = express();
const port = 3000;

// 引入图表生成库
const Chart = require('chart.js');
const { Bar } = Chart;

// 用于存储图表配置的中间件
app.use(express.json());

/**
 * 生成图表的API
 * @param {Object} req - 请求对象，包含图表配置数据
 * @param {Object} res - 响应对象，返回图表数据
 */
app.post('/generate-chart', (req, res) => {
  try {
    // 校验请求体数据
    if (!req.body || !req.body.type || !req.body.data) {
      return res.status(400).json({
        error: 'Invalid chart configuration'
      });
    }

    // 根据图表类型创建相应的图表配置
    const chartType = req.body.type.toLowerCase();
    let chartConfig;
    switch (chartType) {
      case 'bar':
        chartConfig = {
          type: chartType,
          data: req.body.data,
          options: { scales: { y: { beginAtZero: true } } }
        };
        break;
      default:
        return res.status(400).json({
          error: 'Unsupported chart type'
        });
    }

    // 生成图表并返回数据
    const chart = new Bar(chartConfig);
    res.json(chart.data);
  } catch (error) {
    // 错误处理
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

// 服务器启动
app.listen(port, () => {
  console.log(`Interactive chart generator running on http://localhost:${port}`);
});