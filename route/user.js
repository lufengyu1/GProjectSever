const express = require('express');
const user = express.Router();
const Token = require('../fun/jwt');
// 引入user集合构造函数
const { User } = require('../model/user')
user.get('/', (req, res) => {
    res.send('欢迎来到user')
})
user.post('/login', async(req, res) => {
    //接受请求参数
    const { username, password } = req.body;
    let user = await User.findOne({ username, password });
    // 数据库查不到
    if (!user) return res.send({ res: null, meta: { status: 404, des: "账号或密码错误" }, token: null });
    // 用户已经登录
    if (user.isLogin) {
        return res.send({ res: null, meta: { status: 404, des: "账号已登录" }, token: null })
    } else {
        // 初次登录，改变isLogin
        User.updateOne({ username, password }, { isLogin: 0 }, function(err, res) {
            if (err) return res.send({ res: null, meta: { status: 404, des: "数据库错误" }, token: null })
            console.log('用户登录状态更新成功')
        })
    }
    let token = Token.generateToken(user.id);
    return res.send({ res: user, meta: { status: 200, des: "success" }, token: token })
})
module.exports = user;