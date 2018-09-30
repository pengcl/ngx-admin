var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var config = require('../../config/jwt');

router.use(function (req, res, next) {
  // 拿取token 数据 按照自己传递方式写
  var token = req.headers['x-access-token'];
  if (token) {
    // 解码 token (验证 secret 和检查有效期（exp）)
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
      if (err) {
        return res.json({success: false, message: '无效的token.'});
      } else {
        // 如果验证通过，在req中写入解密结果
        req.decoded = decoded;
        console.log(decoded)  ;
        next(); //继续下一步路由
      }
    });
  } else {
    // 没有拿到token 返回错误
    return res.status(403).send({
      success: false,
      message: '没有找到token.'
    });
  }
});

module.exports = router;
