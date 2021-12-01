const express = require('express');
const user = express.Router();
// 引入user集合构造函数
const { User } = require('../model/user')
user.get('/', (req, res) => {
    res.send('欢迎来到user')
})
user.post('/login', async(req, res) => {
    //接受请求参数
    const { username, password } = req.body;
    let user = await User.findOne({ username, password });
    if (user) { res.send({ status: 200, des: "success", result: user }) } else { res.send({ status: 1, des: "no data", result: null }) }
})
module.exports = user;