// 代码生成时间: 2025-09-17 00:56:02
const express = require('express');
const fs = require('fs');
const path = require('path');

// 创建 Express 应用
const app = express();
const port = 3000;

// 定义路由和中间件来处理生成测试报告的请求
app.post('/generate-report', (req, res) => {
  // 检查请求体中是否包含必要的数据
  if (!req.body || !req.body.testResults || !req.body.reportTitle) {
    return res.status(400).json({
      error: 'Missing required data in request body'
    });
  }

  const { testResults, reportTitle } = req.body;

  // 生成测试报告内容
  const reportContent = generateReportContent(testResults, reportTitle);

  // 指定报告文件的路径
  const reportFilePath = path.join(__dirname, 'reports', `${reportTitle}-report.txt`);

  // 将报告内容写入文件
  fs.writeFile(reportFilePath, reportContent, (err) => {
    if (err) {
      // 错误处理
      return res.status(500).json({
        error: 'Failed to write report file'
      });
    }
    // 返回报告文件的路径作为响应
    res.status(201).json({
      reportPath: reportFilePath
    });
  });
});

// 工具函数，用于生成测试报告内容
function generateReportContent(testResults, reportTitle) {
  let content = `Test Report: ${reportTitle}

`;
  content += `Results:
`;
  testResults.forEach(result => {
    content += `Test Name: ${result.testName}, Status: ${result.status}, Details: ${result.details}
`;
  });
  return content;
}

// 启动服务器
app.listen(port, () => {
  console.log(`Test report generator running on http://localhost:${port}`);
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'An internal server error occurred'
  });
});