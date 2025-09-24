// 代码生成时间: 2025-09-24 13:40:25
const express = require('express');
const path = require('path');
const fs = require('fs');

// 引入交互式图表库，例如 Chart.js
const Chart = require('chart.js');

// 创建一个 Express 应用
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件：解析 JSON 和 urlencoded 数据
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use(express.static('public'));

// 根路由，返回图表生成器的HTML页面
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 路由：处理图表数据请求
app.post('/chart-data', (req, res) => {
    // 错误处理
    if (!req.body || !req.body.chartType) {
        return res.status(400).json({
            error: 'Invalid request'
        });
    }

    // 假设我们根据请求生成图表数据
    let chartData = generateChartData(req.body.chartType);
    res.json(chartData);
});

// 路由：处理图表生成请求
app.get('/generate-chart', (req, res) => {
    // 读取图表模板文件
    fs.readFile(path.join(__dirname, 'templates', 'chart_template.html'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Failed to load chart template');
        }
        // 假设我们添加一些数据到模板
        const chartHTML = addChartDataToTemplate(data, {
            title: 'Sample Chart',
            data: [10, 20, 30]
        });
        res.send(chartHTML);
    });
});

// 函数：根据图表类型生成数据
function generateChartData(chartType) {
    // 这里只是一个示例，实际应用中应该根据图表类型生成具体的数据
    switch (chartType) {
        case 'bar':
            return {
                labels: ['Red', 'Blue', 'Yellow'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            };
        default:
            return {};
    }
}

// 函数：将数据添加到图表模板
function addChartDataToTemplate(template, chartData) {
    // 简单的字符串替换，实际应用中可能需要更复杂的处理
    return template.replace('{title}', chartData.title).replace('{data}', JSON.stringify(chartData.data));
}

// 启动服务器
app.listen(PORT, () => {
    console.log(`Interactive chart generator server running on http://localhost:${PORT}`);
});