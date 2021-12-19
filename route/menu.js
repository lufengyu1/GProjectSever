const express = require('express');
const menu = express.Router();
const { Menu } = require('../model/menu');
menu.get('/', async(req, res) => {
    let menu = await Menu.find({}).sort({ id: 1 });
    if (!menu) res.send({ res: null, meta: { status: 404, des: "数据库出错" } });
    res.send({
        res: menu,
        meta: { status: 200, des: "success" }
    });
})
module.exports = menu