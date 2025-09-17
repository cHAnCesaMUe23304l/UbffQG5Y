// 代码生成时间: 2025-09-17 19:07:58
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// 中间件用于解析请求体
app.use(express.json());

// 路由：生成测试报告
app.post('/generate-report', (req, res) => {
    // 检查请求体是否包含必要的数据
    if (!req.body || !req.body.testResults) {
        return res.status(400).json({
            error: 'Invalid request: missing test results'
        });
    }

    // 读取测试报告模板
    const templatePath = path.join(__dirname, 'report-template.html');
    fs.readFile(templatePath, 'utf8', (err, template) => {
        if (err) {
            return res.status(500).json({
                error: 'Failed to read report template'
            });
        }

        // 替换模板中的占位符
        const reportContent = template.replace('{{testResults}}', JSON.stringify(req.body.testResults));

        // 创建测试报告文件
        const reportPath = path.join(__dirname, 'test-report.html');
        fs.writeFile(reportPath, reportContent, err => {
            if (err) {
                return res.status(500).json({
                    error: 'Failed to write report file'
                });
            }

            // 返回成功响应
            res.json({
                message: 'Report generated successfully',
                reportPath
            });
        });
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Test report generator listening at http://localhost:${port}`);
});

// 请注意，此代码假设您有一个名为 'report-template.html' 的HTML模板文件，其中包含占位符 '{{testResults}}'
// 该模板文件应该放在与此JS文件相同的目录下。
