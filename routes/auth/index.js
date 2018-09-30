var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken'); // 使用jwt签名
var Admins = require('../../utils/db/modules/admins');//导入模型数据模块

var config = require('../../config/jwt');

router.route('/sign-in').post(function (req, res, next) {
  if (req.body.email && req.body.password && req.body.fullName) {
    Admins.findByEmail(req.body.email, function (err, admin) {
      if (err) throw err;
      if (!admin) {
        res.send({
          success: false,
          msg: '用户不存在，请重新登录！',
          result: ''
        });
      } else {
        if (req.body.password !== admin.password) {
          res.send({success: false, msg: '用户密码错误', result: ''});
        } else {
          var token = jwt.sign(admin._id, config.jwt.secret, {
            expiresIn: 60 * 60 * 24// 授权时效24小时
          });
          res.send({
            success: true,
            msg: '登录成功',
            token: token
          });
        }
      }
    });
  } else {
    res.send({
      success: false,
      msg: '缺少参数',
      result: ''
    });
  }
});

router.route('/sign-up').post(function (req, res, next) {
  if (req.body.email && req.body.password && req.body.fullName) {

    Admins.findByEmail(req.body.email, function (err, admin) {
      if (!admin) {
        var user = new Admins({
          name: req.body.fullName,
          email: req.body.email,
          password: req.body.password,
          audited: false,
          lv: 0
        });

        user.save(function (err, user) {
          res.send({
            success: true,
            token: user._id,
            data: user
          });
        })
      } else {
        res.send({
          success: false,
          msg: '用户已经存在，请重新注册！',
          result: ''
        });
      }
    });
  } else {
    res.send({
      success: false,
      msg: '缺少参数',
      result: ''
    });
  }
});

module.exports = router;
