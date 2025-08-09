// 代码生成时间: 2025-08-10 07:00:29
const express = require('express');
const app = express();

// 定义错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 定义数学计算工具集
const mathCalculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  },
};

// 定义路由处理数学计算请求
app.get('/math/:operation/:a/:b', (req, res) => {
  const { operation, a, b } = req.params;
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  if (isNaN(numA) || isNaN(numB)) {
    return res.status(400).send('Invalid input numbers');
  }
  try {
    const result = mathCalculator[operation](numA, numB);
    res.json({ result });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});