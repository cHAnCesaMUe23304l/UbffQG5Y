// 代码生成时间: 2025-10-05 03:03:25
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// 设置中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// 模拟数据库中的用户信息
const users = {
  'user1': { password: 'pass1' },
  'user2': { password: 'pass2' }
};

// 登录路由
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username].password === password) {
    req.session.user = username;
    res.json({
      success: true,
      message: 'Logged in successfully',
      user: username
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid username or password'
    });
  }
});

// 登出路由
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error logging out' });
    } else {
      res.json({ success: true, message: 'Logged out successfully' });
    }
  });
});

// 受保护的路由，只有登录用户可以访问
app.get('/protected', (req, res) => {
  if (req.session.user) {
    res.json({ success: true, message: 'Access granted', user: req.session.user });
  } else {
    res.status(401).json({ success: false, message: 'Unauthorized access' });
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 请注意，这是一个简单的示例，实际生产环境中需要更复杂的安全措施，
// 例如使用HTTPS，密码加密存储，以及更复杂的会话管理。