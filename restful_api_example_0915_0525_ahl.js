// 代码生成时间: 2025-09-15 05:25:14
const express = require('express');
const app = express();
const port = 3000;

// 中间件，用于解析JSON请求体
app.use(express.json());
# 增强安全性

// 模拟数据库
const products = [
  { id: 1, name: 'Apple', price: 100 },
# FIXME: 处理边界情况
  { id: 2, name: 'Banana', price: 50 },
  { id: 3, name: 'Cherry', price: 150 }
];

// 获取所有产品
# 优化算法效率
app.get('/products', (req, res) => {
  res.status(200).json(products);
});

// 获取单个产品
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.status(200).json(product);
# 改进用户体验
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});
# 扩展功能模块

// 创建产品
# 改进用户体验
app.post('/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// 更新产品
app.put('/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
# 扩展功能模块
  if (productIndex === -1) {
    res.status(404).json({ message: 'Product not found' });
# NOTE: 重要实现细节
  } else {
    const updatedProduct = {
      id: parseInt(req.params.id),
      name: req.body.name,
# 增强安全性
      price: req.body.price
    };
# 优化算法效率
    products[productIndex] = updatedProduct;
    res.status(200).json(updatedProduct);
# 增强安全性
  }
});

// 删除产品
app.delete('/products/:id', (req, res) => {
# 扩展功能模块
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    products.splice(productIndex, 1);
    res.status(200).json({ message: 'Product deleted' });
  }
});

// 错误处理中间件
# 优化算法效率
app.use((err, req, res, next) => {
# 优化算法效率
  res.status(500).json({ message: 'Internal server error' });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});