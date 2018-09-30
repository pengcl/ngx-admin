var mongoose = require('mongoose');
var AdminsSchema = require('../schemas/admins'); //拿到导出的数据集模块
var Admins = mongoose.model('Admins', AdminsSchema); // 编译生成Users 模型

module.exports = Admins;
