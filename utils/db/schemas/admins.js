var mongoose = require('mongoose');
//申明一个mongoons对象
var AdminsSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  audited: Boolean,
  lv: Number
});

//每次执行都会调用,时间更新操作
AdminsSchema.pre('save', function (next) {
  if (this.isNew) {
  } else {
  }
  next();
});

//查询的静态方法
AdminsSchema.statics = {
  findAll: function (cb) { //查询所有数据
    return this.find().sort('meta.updateAt').exec(cb) //回调
  },
  findById: function (id, cb) { //根据id查询单条数据
    return this.findOne({_id: id}).exec(cb)
  },
  findByEmail: function (email, cb) { //根据id查询单条数据
    return this.findOne({email: email}).exec(cb)
  }
};
//暴露出去的方法
module.exports = AdminsSchema;
