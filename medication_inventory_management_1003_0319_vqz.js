// 代码生成时间: 2025-10-03 03:19:22
const express = require('express');
const app = express();
const port = 3000;

// 模拟数据库，包含药品库存信息
const inventory = {
  '001': {
    name: 'Paracetamol',
    quantity: 100
  },
  '002': {
    name: 'Aspirin',
    quantity: 50
  },
  // 更多药品...
};

// 中间件，用于解析请求体
app.use(express.json());

// 获取所有药品库存信息
app.get('/api/inventory', (req, res) => {
  try {
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// 获取单个药品的库存信息
app.get('/api/inventory/:medicationId', (req, res) => {
  const { medicationId } = req.params;
  try {
    const medication = inventory[medicationId];
    if (medication) {
      res.status(200).json(medication);
    } else {
      res.status(404).json({ message: 'Medication not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// 更新药品库存信息
app.put('/api/inventory/:medicationId', (req, res) => {
  const { medicationId } = req.params;
  const { quantity } = req.body;
  try {
    if (inventory[medicationId]) {
      inventory[medicationId].quantity = quantity;
      res.status(200).json({ message: 'Inventory updated successfully' });
    } else {
      res.status(404).json({ message: 'Medication not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Medication Inventory Management app listening at http://localhost:${port}`);
});
