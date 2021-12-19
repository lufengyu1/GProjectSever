const express = require('express');
const right = express.Router();
const { RightList } = require('../model/rightList');
const buildTree = require('../fun/buildTree.js');
// 获取权限列表
right.get('/rights', async(req, res) => {
    if (req.query.type === 'list') {
        let result = await RightList.find({}).sort({ id: 1 });
        if (!result.length) return res.send({ result: null, meta: { status: 404, des: '无数据' } });
        return res.send({ res: result, meta: { status: 200, des: "success" } });
    } else if (req.query.type === 'tree') {
        let rightList = await RightList.find({});
        if (!rightList.length) return res.send({ res: null, meta: { status: 404, des: '无数据' } });
        let result = buildTree(rightList)
        res.send({ res: result, meta: { status: 200, des: "success" } });
    }
})
module.exports = right