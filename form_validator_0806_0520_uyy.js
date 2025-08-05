// 代码生成时间: 2025-08-06 05:20:38
const express = require('express');
const { check, validationResult } = require('express-validator');

// 创建一个express应用
const app = express();
app.use(express.json()); // 中间件来解析JSON请求体

// 表单数据验证器
const formValidator = (req, res, next) => {
    try {
        // 检查请求体中的姓名是否非空
        check('name')
            .exists({ checkFalsy: true })
            .withMessage('Name is required.');

        // 检查请求体中的年龄是否为正整数
        check('age')
            .exists({ checkFalsy: true })
            .isInt()
            .withMessage('Age must be an integer.');

        const errors = validationResult(req);

        // 如果有错误，返回400状态码和错误信息
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // 如果没有错误，继续执行下一个中间件
        next();
    } catch (error) {
        // 错误处理
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// 路由：POST /users
app.post('/users', formValidator, (req, res) => {
    // 如果验证通过，存储用户数据
    const { name, age } = req.body;
    res.status(201).json({ name, age });
});

// 服务器监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// 模块化导出验证器，以便在其他路由中重用
module.exports = formValidator;