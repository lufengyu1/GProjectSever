const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        unique: true,
        required: true
    },
    roleDes: {
        type: String,
    },
    rights: {
        type: Array,
        default: [],
    },
    children: {
        type: Array,
        default: [],
    }
});
const Role = mongoose.model('Role', roleSchema);
// Role.create({
//     roleName: "超级管理员",
//     roleDes: '拥有全部权限',
//     rights: ['100', '110', '111', '112', '113', '114', '200', '210', '211', '212', '213', '214', '220', '221', '222', '223', '224'],
//     children: [],
// });
// Role.insertMany([{
//     roleName: "普通管理员",
//     roleDes: '',
//     rights: ['100'],
//     children: [],
// }])
module.exports = { Role }