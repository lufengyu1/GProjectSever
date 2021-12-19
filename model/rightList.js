const mongoose = require('mongoose');
// const menu = require('../route/menu');
const rightListSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    authName: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    pid: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    children: {
        type: Array,
        default: [],
    }
});
const RightList = mongoose.model('RightList', rightListSchema);
// RightList.create([{
//     id: "224",
//     authName: '查询权限',
//     level: 2,
//     pid: "220",
//     path: 'rights',
// }])
// RightList.insertMany([{
//         id: '110',
//         authName: '用户列表',
//         level: 1,
//         pid: '100',
//         path: 'users',
//     }, {
//         id: '111',
//         authName: '添加用户',
//         level: 2,
//         pid: '111',
//         path: 'users',
//     }, {

//         id: '112',
//         authName: '删除用户',
//         level: 2,
//         pid: '111',
//         path: 'users',

//     }, {
//         id: '113',
//         authName: '修改用户',
//         level: 2,
//         pid: '111',
//         path: 'users',
//     }, {
//         id: '114',
//         authName: '删除用户',
//         level: 2,
//         pid: '111',
//         path: 'users',
//     }, {
//         id: '200',
//         authName: '权限管理',
//         level: 0,
//         pid: '0',
//         path: 'rights',
//     }, {
//         id: '210',
//         authName: '角色列表',
//         level: 1,
//         pid: '200',
//         path: 'rights',
//     }, {
//         id: '211',
//         authName: '添加角色',
//         level: 2,
//         pid: '210',
//         path: 'rights',
//     }, {
//         id: '212',
//         authName: '删除角色',
//         level: 2,
//         pid: '210',
//         path: 'rights',
//     }, {
//         id: '213',
//         authName: '修改角色',
//         level: 2,
//         pid: '210',
//         path: 'rights',
//     }, {
//         id: '214',
//         authName: '查询角色',
//         level: 2,
//         pid: '210',
//         path: 'rights',
//     }, {
//         id: '220',
//         authName: '权限列表',
//         level: 1,
//         pid: '220',
//         path: 'rights',
//     }, {
//         id: '221',
//         authName: '添加权限',
//         level: 2,
//         pid: '220',
//         path: 'rights',
//     }, {
//         id: '222',
//         authName: '删除权限',
//         level: 2,
//         pid: '220',
//         path: 'rights',
//     }, {
//         id: '223',
//         authName: '修改权限',
//         level: 2,
//         pid: '220',
//         path: 'rights',
//     }, {
//         id: '224',
//         authName: '删除权限',
//         level: 2,
//         pid: '220',
//         path: 'rights',
//     }

// ])
module.exports = {
    RightList
}