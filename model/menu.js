const mongoose = require('mongoose');
const menu = require('../route/menu');
const menuSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    authName: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    children: {
        type: Array,
    }
});
const Menu = mongoose.model('menus', menuSchema);
// Menu.create({
//     id: '100',
//     authName: '用户管理',
//     path: 'users',
//     children: [{
//         id: '110',
//         authName: '用户列表',
//         path: 'users',
//     }]
// })
module.exports = {
    Menu
}