const express = require('express');
const role = express.Router();
const { Role } = require('../model/role');
const { RightList } = require('../model/rightList');
const buildTree = require('../fun/buildTree.js');
const { format } = require('express/lib/response');
// 将角色拥有的权限id 在权限库中的数据 找出来
let findRightObj = function(rights, rightList) {
    let list = [];
    for (let key of rightList) {
        if (rights.includes(key.id)) list.push(key);
    }
    return list;
};

// 获取角色列表
role.get('/roles', async(req, res) => {
    let roleList = await Role.find({});
    for (let item of roleList) { // 遍历每个角色
        let rightList = await RightList.find({});
        if (!roleList.length) return res.send({ res: null, meta: { status: 404, des: '无数据' } });
        item.children = buildTree(findRightObj(item.rights, rightList));
    }
    // let arr = [];
    // for (let i = 0; i < roleList.length; i++) {
    //     let rightList = await RightList.find({});
    //     if (!roleList.length) return res.send({ res: null, meta: { status: 404, des: '无数据' } });
    //     arr[i] = findRightObj(roleList[i].rights, rightList, arr[i])
    //     roleList[i].children = buildTree(arr[i]);
    // }
    return res.send({ res: roleList, meta: { status: 200, des: "success" } });
});

// 工具id 返回角色信息
role.get('/findById', async(req, res) => {
    const result = await Role.findOne({ _id: req.query._id });
    if (result == null) return res.send({ res: null, meta: { status: 404, des: '未找到该数据' } });
    res.send({ res: result, meta: { status: 200, des: "success" } });
});
// 更新角色信息
role.put('/update', async(req, res) => {
    let result = await Role.updateOne({ _id: req.body.roleInfo._id }, req.body.roleInfo);
    if (!result.acknowledged) return res.send({ res: null, des: { status: 404, des: '角色信息更新失败' } });
    res.send({ res: null, meta: { status: 200, des: "success" } });
});
// 删除权限
role.delete('/deleteRight', async(req, res) => {
    const roleObj = await Role.findOne({ _id: req.query._id });
    roleObj.rights.remove(req.query.rightId);
    let rightList = await RightList.find({});
    let children = buildTree(findRightObj(roleObj.rights, rightList));
    const result = await Role.updateOne({ _id: req.query._id }, roleObj);
    if (!result.acknowledged) return res.send({ res: null, meta: { status: 404, des: "角色权限删除失败" } });
    res.send({ res: children, meta: { status: 200, des: "success" } });

});
// 添加角色
role.get('/add', async(req, res) => {
    console.log(req.query);
    let exist = await Role.findOne({ roleName: req.query.roleName });
    if (exist) {
        return res.send({ res: null, meta: { status: 404, des: "该角色已经存在" } });
    }
    let result = await Role.insertMany(req.query);
    if (result) {
        res.send({ res: null, meta: { status: 200, des: "success" } });
    }
});
// 删除角色
role.delete('/delete', async(req, res) => {
    let result = await Role.deleteOne({ _id: req.query._id });
    if (result.deletedCount > 0) return res.send({ res: null, meta: { status: 200, des: "success" } });
    res.send({ res: null, meta: { status: 404, des: "角色删除失败" } });
})
module.exports = role;