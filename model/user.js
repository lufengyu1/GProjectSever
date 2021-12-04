// 创建用户集合
const mongoose = require('mongoose');
const user = require('../route/user');
// 创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 12
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 18
    },
    role: {
        type: String,
        required: true,
    },
    state: {
        type: Number,
        default: 0 // 0启用，1禁止
    },
    isLogin: {
        type: Number,
        default: 0 // 0未登录，1已登录
    }
});

//创建集合
const User = mongoose.model('User', userSchema);
// User.create({
//     username: 'lfy',
//     password: '123456',
//     role: "高级管理员",
//     state: 0,
//     isLogin: 0
// }).then(() => {
//     console.log('用户创建成功');
// }).catch(() => {
//     console.log('用户创建失败');
// })


module.exports = {
    User
}