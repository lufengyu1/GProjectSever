const express = require('express')
const bodyParser = require('body-parser')
const app = express();
//数据库连接
require('./model/connect');
//处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 路由模块化
const user = require('./route/user');
const menu = require('./route/menu');
// 解决跨域
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
// 设置路由
app.use('/user', user);
app.use('/menu', menu);

app.listen(3000, () => {
    console.log('服务器已启动');
})