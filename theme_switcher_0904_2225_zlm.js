// 代码生成时间: 2025-09-04 22:25:53
const express = require('express');
const session = require('express-session');

// 创建Express应用
const app = express();
const PORT = 3000;

// 设置中间件，解析请求体
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 使用express-session管理会话
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // 注意在生产环境中应该设置为true
}));

// 存储主题的键
const THEME_KEY = 'userTheme';

// 获取当前主题的中间件
function getCurrentTheme(req, res, next) {
  // 如果会话中已有主题，则使用，否则默认为'light'
  req.theme = req.session[THEME_KEY] || 'light';
  next();
}

// 设置主题的路由
app.get('/set-theme/:theme', (req, res) => {
  const { theme } = req.params;
  // 验证主题是否有效
  if ((theme !== 'light') && (theme !== 'dark')) {
    return res.status(400).json({
      error: 'Invalid theme',
      message: 'Theme must be either light or dark'
    });
  }
  // 存储主题到会话
  req.session[THEME_KEY] = theme;
  res.json({
    message: 'Theme updated successfully',
    currentTheme: theme
  });
});

// 首页路由，显示当前主题
app.get('/', getCurrentTheme, (req, res) => {
  res.send(`Current theme is: ${req.theme}`);
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});