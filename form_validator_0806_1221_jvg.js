// 代码生成时间: 2025-08-06 12:21:06
const express = require('express');
const { body, validationResult } = require('express-validator');

// 创建Express应用
const app = express();

// 设置跨域资源共享（CORS）
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// 表单数据验证器
const formValidator = (fields) => {
    let validators = [];
    
    // 为每个字段创建验证规则
    fields.forEach(field => {
        validators.push(
            body(field.name)
                .trim()
                .custom(value => {
                    // 根据字段类型进行验证
                    if (field.type === 'required' && (!value || value === '')) {
                        throw new Error('Field is required');
                    } else if (field.type === 'email' && !/^\w+([\w-]*\w+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
                        throw new Error('Invalid email');
                    } else if (field.type === 'minLength' && value.length < field.minLength) {
                        throw new Error(`Minimum length is ${field.minLength}`);
                    } else if (field.type === 'maxLength' && value.length > field.maxLength) {
                        throw new Error(`Maximum length is ${field.maxLength}`);
                    }
                    return true;
                })
        );
    });
    
    return validators;
};

// 表单提交处理
app.post('/submit', formValidator([{ name: 'email', type: 'email' }, { name: 'password', type: 'minLength', minLength: 8 }]), (req, res) => {
    // 如果验证失败，返回错误信息
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    // 如果验证成功，处理表单数据
    res.json({ message: 'Form submitted successfully', data: req.body });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});