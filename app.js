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

app.use('/user', user);


app.listen(3000, () => {
    console.log('服务器已启动');
})