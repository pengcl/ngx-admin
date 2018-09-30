var mongoose = require('mongoose');
var CatalogsSchema = require('../schemas/catalogs'); //拿到导出的数据集模块
var Catalogs = mongoose.model('Catalogs', CatalogsSchema); // 编译生成Users 模型

module.exports = Catalogs;
