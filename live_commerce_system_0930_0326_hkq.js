// 代码生成时间: 2025-09-30 03:26:23
const express = require('express');
const app = express();

// 引入body-parser中间件解析请求体
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// 直播带货的商品数据
let products = [];

// 获取所有商品的路由
app.get('/products', (req, res) => {
    try {
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 添加新商品的路由
app.post('/products', (req, res) => {
    const { name, price, description } = req.body;
    if (!name || !price || !description) {
        return res.status(400).json({ error: 'Missing product information' });
    }
    try {
        const newProduct = { name, price, description, id: Date.now() };
        products.push(newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 更新商品信息的路由
app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const productIndex = products.findIndex(p => p.id === Number(id));
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    try {
        products[productIndex] = { ...products[productIndex], name, price, description };
        res.status(200).json(products[productIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 删除商品的路由
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex(p => p.id === Number(id));
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    try {
        products.splice(productIndex, 1);
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 设置端口号
const PORT = process.env.PORT || 3000;

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});