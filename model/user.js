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
    mail: {
        type: String,
    },
    phone: {
        type: Number
    },
    role: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        default: true // true启用，false禁止
    },
    isLogin: {
        type: Number,
        default: 0 // 0未登录，1已登录
    }
});

//创建集合
const User = mongoose.model('User', userSchema);
// 添加数据
// User.create([{
//     username: 'admin',
//     password: '123456',
//     mail: '123456@qq.com',
//     phone: 12345678912,
//     role: "超级管理员",
//     state: true,
//     isLogin: 0
// }, {
//     username: 'lfy',
//     password: '123456',
//     mail: '123456@qq.com',
//     phone: 12345678912,
//     role: "高级管理员",
//     state: true,
//     isLogin: 0
// }, {
//     username: 'zcy',
//     password: '123456',
//     mail: '123456@qq.com',
//     phone: 12345678912,
//     role: "高级管理员",
//     state: true,
//     isLogin: 0
// }]).then(() => {
//     console.log('用户创建成功');
// }).catch(() => {
//     console.log('用户创建失败');
// })


module.exports = {
    User
}