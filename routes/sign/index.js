var express = require('express');
var router = express.Router();

var Users = require('../../utils/db/modules/users');//导入模型数据模块
var Cities = require('../../utils/db/modules/cities');//导入模型数据模块
var Courses = require('../../utils/db/modules/courses');//导入模型数据模块
var Signs = require('../../utils/db/modules/signs');//导入模型数据模块

router.get('/get', function (req, res, next) {
  if (req.query.id) {
    Signs.findById(req.query.id, (err, sign) => {
      if (sign) {

        Users.findById(sign.uid, function (err, user) {
          if (user) {
            Courses.findById(sign.course, function (err, course) {
              if (course) {
                Cities.findById(sign.city, function (err, city) {
                  res.send({
                    success: true,
                    msg: '获取签到数据成功',
                    result: {
                      sign: sign,
                      user: user,
                      city: city,
                      course: course
                    }
                  });
                });
              }
            })
          }
        });
      } else {
        res.send({
          success: false,
          msg: '没有签到数据',
          result: sign
        })
      }
    })
  } else {
    Signs.findAll((err, signs) => {
      var count = 0;
      const _signs = [];
      if (signs.length === 0) {
        res.send({
          success: true,
          msg: '获取签到数据成功',
          result: _signs
        });
      } else {
        signs.forEach((sign) => {
          Users.findById(sign.uid, function (err, user) {
            Courses.findById(sign.course, function (err, course) {
              Cities.findById(sign.city, function (err, city) {
                count = count + 1;
                _signs.push({
                  sign: sign,
                  user: user,
                  city: city,
                  course: course
                });
                if (count === signs.length) {
                  res.send({
                    success: true,
                    msg: '获取签到数据成功',
                    result: _signs
                  });
                }
              });
            })
          });
        });
      }
    });
  }
});

router.route('/remove').post(function (req, res, next) {
  if (req.body.id) {
    Signs.findByIdAndRemove(req.body.id, (err, city) => {
      Signs.findAll((err, signs) => {
        res.send({
          success: true,
          msg: '删除成功',
          result: signs
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

router.get('/export', function (req, res, next) {
  var fileName = "kingfamily.xls";
  res.set({
    'Content-Type': 'application/vnd.ms-execl',
    'Content-Disposition': "attachment;filename=" + encodeURIComponent(fileName),
    'Pragma': 'no-cache',
    'Expires': 0
  });

  Signs.findAll((err, signs) => {
    var count = 0;
    const _signs = [];
    if (signs.length === 0) {
      res.send({
        success: true,
        msg: '获取签到数据成功',
        result: _signs
      });
    } else {
      signs.forEach((sign) => {
        Users.findById(sign.uid, function (err, user) {
          Courses.findById(sign.course, function (err, course) {
            Cities.findById(sign.city, function (err, city) {
              count = count + 1;
              _signs.push({
                sign: sign,
                user: user,
                city: city,
                course: course
              });
              if (count === signs.length) {

                const arr = [];
                _signs.forEach(item => {
                  const obj = {
                    id: sign._id,
                    name: item.user.real_name || item.user.nick_name || item.user.phone,
                    nickName: item.user.nick_name,
                    phone: item.user.phone,
                    level: item.user.level_id,
                    origin: item.user.reg_origin,
                    city: item.city ? item.city.label : '',
                    course: item.course ? item.course.label : '',
                    signAt: item.sign.signAt,
                    cardNo: '',
                    floor: '',
                    company: ''
                  };
                  arr.push(obj);
                });
                var content = '';
                content += 'id';
                content += '\t';
                content += 'name';
                content += '\t';
                content += 'nickName';
                content += '\t';
                content += 'phone';
                content += '\t';
                content += 'level';
                content += '\t';
                content += 'origin';
                content += '\t';
                content += 'city';
                content += '\t';
                content += 'course';
                content += '\t';
                content += 'signAt';
                content += '\t';
                content += 'cardNo';
                content += '\t';
                content += 'floor';
                content += '\t';
                content += 'company';
                content += '\t';
                content += '\t\n';

                for (var i = 0, len = arr.length; i < len; i++) {
                  content += arr[i]['id'];
                  content += '\t';
                  content += arr[i]['name'];
                  content += '\t';
                  content += arr[i]['nickName'];
                  content += '\t';
                  content += arr[i]['phone'];
                  content += '\t';
                  content += arr[i]['level'];
                  content += '\t';
                  content += arr[i]['origin'];
                  content += '\t';
                  content += arr[i]['city'];
                  content += '\t';
                  content += arr[i]['course'];
                  content += '\t';
                  content += arr[i]['signAt'];
                  content += '\t';
                  content += arr[i]['cardNo'];
                  content += '\t';
                  content += arr[i]['floor'];
                  content += '\t';
                  content += arr[i]['company'];
                  content += '\t';
                  content += '\t\n';
                }
                var buffer = new Buffer(content);
                //需要转换字符集
                var iconv = require('iconv-lite');
                var str = iconv.encode(buffer, 'gb2312');
                res.send(str);
              }
            });
          })
        });
      });
    }
  });
});

module.exports = router;
