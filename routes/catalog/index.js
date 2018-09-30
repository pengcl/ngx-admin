var express = require('express');
var router = express.Router();

var Catalogs = require('../../utils/db/modules/catalogs');//导入模型数据模块

router.get('/get', function (req, res, next) {
  if (req.query.id) {
    Catalogs.findById(req.query.id, function (err, catalog) {
      if (catalog) {
        res.send({
          success: true,
          msg: '获取城市成功',
          result: catalog
        })
      } else {
        res.send({
          success: false,
          msg: '没有',
          result: catalog
        })
      }
    })
  } else {
    Catalogs.findAll(function (err, catalogs) {
      res.send({
        success: true,
        msg: '获取城市成功',
        result: catalogs
      });
    });
  }
});

router.route('/add').post(function (req, res, next) {
  if (req.body.label) {
    console.log('haha');
    Catalogs.findByLabel(req.body.label, function (err, catalog) {
      if (catalog) {
        res.send({
          success: false,
          msg: '添加的城市已经存在,请重新添加!',
          result: ''
        })
      } else {
        var catalog = new Catalogs(req.body);
        catalog.save(function (err, catalog) {
          if (err) return false;
          res.send({
            success: true,
            msg: '添加城市成功',
            result: catalog
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
    console.log(req.body);
    Catalogs.findByIdAndUpdate(req.body._id, req.body, function (err, catalog) {
      res.send({
        success: true,
        msg: '修改成功!',
        result: catalog
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
    Catalogs.findByIdAndRemove(req.body.id, function (err, catalog) {
      Catalogs.findAll(function (err, catalogs) {
        res.send({
          success: true,
          msg: '删除成功',
          result: catalogs
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
  console.log(req.body.ids);
  if (req.body.ids) {
    Catalogs.remove({
      _id: {$in: req.body.ids}
    }, function () {
      Catalogs.findAll(function (err, catalogs) {
        res.send({
          success: true,
          msg: '删除成功',
          result: catalogs
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
