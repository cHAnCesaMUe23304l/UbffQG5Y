// 代码生成时间: 2025-08-14 04:15:58
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

// 创建一个express应用
const app = express();
const PORT = process.env.PORT || 3000;

// 使用body-parser中间件解析JSON请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 假设用户存储的简单示例，实际应用中应该使用数据库
const users = [];

// 登录路由
app.post('/login', async (req, res) => {
  // 获取请求体中的用户名和密码
  const { username, password } = req.body;
  if (!username || !password) {
    // 如果用户名或密码为空，则返回400错误
    return res.status(400).json({ msg: 'Username or password is required' });
  }

  // 查找用户
  const user = users.find(u => u.username === username);
  if (!user) {
    // 如果用户不存在，则返回404错误
    return res.status(404).json({ msg: 'User not found' });
  }

  try {
    // 使用bcrypt比较密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // 如果密码不匹配，则返回400错误
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // 如果验证成功，生成JWT
    const accessToken = jsonwebtoken.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ msg: 'Login successful', token: accessToken });
  } catch (error) {
    // 错误处理
    res.status(500).json({ msg: 'Error on login', error: error.message });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 以下是使用bcrypt和jsonwebtoken的额外配置
// 生成盐和哈希密码
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('your_password', salt);

// 创建用户示例
const newUser = {
  id: 1,
  username: 'testUser',
  password: hash,
};

// 添加用户到用户列表
users.push(newUser);


/*
 * 注释:
 * 该代码实现了一个基本的用户登录验证系统，使用bcryptjs来哈希密码并验证
 * 登录，使用jsonwebtoken来生成JWT用于身份验证。
 * 应该将'your_jwt_secret'替换为一个安全的秘钥，并在实际部署中
 * 使用数据库来存储用户信息。
 *
 * 错误处理包括了基本的输入验证和密码匹配错误。
 * 代码结构清晰，易于理解，并遵循JS最佳实践。
 */