// 代码生成时间: 2025-08-28 04:44:47
const express = require('express');
const app = express();

// 数据模型设计
// 使用一个简单的对象模拟数据库
let userData = {
  "1": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  },
  "2": {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane.smith@example.com"
  }
};

// 将用户数据转换为数组，以便进行搜索
let users = Object.values(userData);

// 获取所有用户
app.get('/users', (req, res) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 根据ID获取单个用户
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  try {
    const user = users.find(u => u.id === parseInt(userId));
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 添加新用户
app.post('/users', (req, res) => {
  try {
    const { name, email } = req.body;
    const newId = Math.max(...Object.keys(userData).map(Number)) + 1;
    userData[newId] = { id: newId, name, email };
    users = Object.values(userData);
    res.status(201).json(userData[newId]);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 更新用户信息
app.put('/user/:id', (req, res) => {
  const userId = req.params.id;
  try {
    const user = userData[userId];
    if (user) {
      const { name, email } = req.body;
      userData[userId] = { ...user, name, email };
      users = Object.values(userData);
      res.status(200).json(userData[userId]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 删除用户
app.delete('/user/:id', (req, res) => {
  const userId = req.params.id;
  try {
    if (userData[userId]) {
      delete userData[userId];
      users = Object.values(userData);
      res.status(200).json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});