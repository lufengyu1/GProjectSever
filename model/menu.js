const mongoose = require('mongoose');
const menu = require('../route/menu');
const menuSchema = new mongoose.Schema({});
const Menu = mongoose.model('menus', menuSchema);
module.exports = {
    Menu
}