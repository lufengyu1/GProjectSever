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
    if (!result.acknowledged || !result.modifiedCount) return res.send({ res: null, meta: { status: 404, des: "更新失败" } });
    return res.send({ res: null, meta: { status: 200, des: "更新成功" } })
})

// 添加用户接口
user.put('/add', async(req, res) => {
    let exist = await User.findOne({ username: req.body.username });
    if (exist) {
        res.send({ res: null, meta: { status: 404, des: "用户名已存在" } });
    } else {
        let result = await User.insertMany(req.body);
        if (result) {
            res.send({ res: null, meta: { status: 200, des: "success" } });
        }
    }
});

// 根据id返回用户信息接口
user.get('/userinfo', async(req, res) => {
    let result = await User.findOne(req.query);
    if (!result) return res.send({ res: null, meta: { status: 404, des: "未查询到该用户" } });
    return res.send({ res: result, meta: { status: 200, des: "success" } });
})

// 根据id删除用户
user.delete('/delete', async(req, res) => {
    let result1 = await User.findOne({ _id: req.query._id })
    if (!result1) return res.send({ result: null, meta: { status: 404, des: "该用户不存在" } });
    let result2 = await User.deleteOne({ _id: req.query._id });
    if (result2.deletedCount > 0) return res.send({ result: null, meta: { status: 200, des: "success" } });
})
module.exports = user;