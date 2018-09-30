var express = require('express');
var router = express.Router();

var Courses = require('../../utils/db/modules/courses');//导入模型数据模块

router.get('/get', function (req, res, next) {
  if (req.query.id) {
    Courses.findById(req.query.id, function (err, course) {
      if (course) {
        res.send({
          success: true,
          msg: '获取课程成功',
          result: course
        })
      } else {
        res.send({
          success: false,
          msg: '没有',
          result: course
        })
      }
    })
  } else {
    Courses.findAll(function (err, courses) {
      res.send({
        success: true,
        msg: '获取课程成功',
        result: courses
      });
    });
  }
});

router.route('/add').post(function (req, res, next) {
  if (req.body.label && req.body.city && req.body.start && req.body.end) {
    Courses.findByLabel(req.body.label, function (err, course) {
      if (course) {
        res.send({
          success: false,
          msg: '添加的课程已经存在,请重新添加!',
          result: ''
        })
      } else {
        var course = new Courses(req.body);
        course.save(function (err) {
          console.log(err);
          if (err) return false;
          res.send({
            success: true,
            msg: '添加课程成功',
            result: ''
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
  if (req.body._id) {
    console.log(req.body);
    Courses.findOneAndUpdate({_id: req.body._id}, req.body, function (err, course) {
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
    Courses.findByIdAndRemove(req.body.id, function (err, course) {
      Courses.findAll(function (err, courses) {
        res.send({
          success: true,
          msg: '删除成功',
          result: courses
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
    Courses.remove({
      _id: {$in: req.body.ids}
    }, function () {
      Courses.findAll(function (err, courses) {
        res.send({
          success: true,
          msg: '删除成功',
          result: courses
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
