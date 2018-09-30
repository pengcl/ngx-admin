var express = require('express');
var router = express.Router();

var Cities = require('../../utils/db/modules/cities');//导入模型数据模块

router.get('/get', function (req, res, next) {
  if (req.query.id) {
    Cities.findById(req.query.id, function (err, city) {
      if (city) {
        res.send({
          success: true,
          msg: '获取城市成功',
          result: city
        })
      } else {
        res.send({
          success: false,
          msg: '没有',
          result: city
        })
      }
    })
  } else {
    Cities.findAll(function (err, cities) {
      res.send({
        success: true,
        msg: '获取城市成功',
        result: cities
      });
    });
  }
});

router.route('/add').post(function (req, res, next) {
  if (req.body.label) {
    Cities.findByLabel(req.body.label, function (err, city) {
      if (city) {
        res.send({
          success: false,
          msg: '添加的城市已经存在,请重新添加!',
          result: ''
        })
      } else {
        var city = new Cities(req.body);
        city.save(function (err, city) {
          if (err) return false;
          res.send({
            success: true,
            msg: '添加城市成功',
            result: city
          })
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

router.route('/edit').post(function (req, res, next) {
  if (req.body.label) {
    Cities.findByIdAndUpdate(req.body._id, req.body, function (err, city) {
      res.send({
        success: true,
        msg: '修改成功!',
        result: ''
      })
    });
  } else {
    res.send({
      success: false,
      msg: '缺少参数',
      result: ''
    });
  }
});

router.route('/remove').post(function (req, res, next) {
  if (req.body.id) {
    Cities.findByIdAndRemove(req.body.id, function (err, city) {
      Cities.findAll(function (err, cities) {
        res.send({
          success: true,
          msg: '删除成功',
          result: cities
        });
      });
    });
  } else {
    res.send({
      success: false,
      msg: '缺少参数',
      result: ''
    });
  }
});

router.route('/removes').post(function (req, res, next) {
  if (req.body.ids) {
    Cities.remove({
      _id: {$in: req.body.ids}
    }, function () {
      Cities.findAll(function (err, cities) {
        res.send({
          success: true,
          msg: '删除成功',
          result: cities
        });
      });
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
