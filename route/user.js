const express = require('express');
const user = express.Router();
const Token = require('../fun/jwt');
// 引入user集合构造函数
const { User } = require('../model/user');

// 登录接口
user.post('/login', async(req, res) => {
    //接受请求参数
    const { username, password } = req.body;
    let user = await User.findOne({ username, password });
    // 数据库查不到
    if (!user) return res.send({ res: null, meta: { status: 404, des: "账号或密码错误" }, token: null });
    // 用户已经登录
    if (!user.state) return res.send({ res: null, meta: { statue: 404, des: "账号已被禁用" } });
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
});

// 用户列表接口
user.get('/users', async(req, res) => {
    let { query, pagenum, pagesize } = req.query;
    // 客户端参数错误
    if (!pagenum || !pagesize) return res.send({ res: null, meta: { status: 404, des: '参数格式错误' } });
    // 分页+模糊查询
    // 将pagesize转换成数字
    let users = await User.find({ username: { $regex: query } });
    let totalpage = Math.ceil(users.length);
    users = await User.find({ username: { $regex: query } }).limit(pagesize - 0);
    if (pagenum > 1) {
        users = await User.find({ username: { $regex: query } }).skip((pagenum - 1) * pagesize).limit(pagesize - 0);
    }
    if (!users) return res.send({ res: null, meta: { status: 404, des: '数据库错误' } });
    return res.send({ res: { totalpage, pagenum, users }, meta: { status: 200, des: "success" } })
});

// 更新用户信息接口
user.put('/update', async(req, res) => {
    let result = await User.updateOne({ _id: req.body.id }, req.body.pa);
    if (!result.acknowledged || !result.modifiedCount) return res.send({ res: null, meta: { state: 404, des: "更新失败" } });
    return res.send({ res: null, meta: { state: 200, des: "更新成功" } })
})
module.exports = user;