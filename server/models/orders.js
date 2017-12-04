var express = require('express');
var router = express.Router();
var dao = require('../db/dao.js');
var moment = require('moment');
var webUtil = require('../common/util/WebUtil.js');
/* GET home page. */
router.get('/orders', function(req, res, next) {
  //获取并配置查询相关参数
  var page = req.query.page == undefined? 1:req.query.page;
  var size = req.query.size == undefined? 10:req.query.size;
  var date = req.query.date == undefined? moment().format('YYYY-MM-DD'):moment(req.query.date).format('YYYY-MM-DD');
  //设置查询起始截至时间
  var beginDate = date.substring(0,8) + '01 00:00:00';
  var endDate = moment(date).endOf('month').format('YYYY-MM-DD') + " 23:59:59";
  var yearBegin = date.substring(0,4) + '-01-01 00:00:00';
  var yearEnd = date.substring(0,4) + '-12-31 23:59:59';

  //查询回调函数
  function resResult(error, recordInfo, affected){
    //返回数据
    //res.json(200,webUtil.formatResult(recordInfo));
    res.json(200,recordInfo.recordset);
  }

  //查询发货情况
  dao.queryByPage(page,size,"",'SELECT ISNULL(c.customer,\'合计\') customer,SUM(c.monthplan) AS monthplan,' +
  'SUM(c.monthlj) AS monthlj,SUM(c.complent) AS complent,SUM(c.yearlj) AS yearlj,SUM(c.yearplan) AS yearplan ' +
  'FROM (SELECT a.KH AS customer,0 AS monthplan,ISNULL(Convert(decimal(18,2),b.monthlj/10000.00),0) AS monthlj,' +
  '0 AS complent,Convert(decimal(18,2),a.yearlj/10000.00) AS yearlj,0 AS yearplan FROM(SELECT KH,SUM(nMoney) AS yearlj ' +
  'FROM URDailyorders WHERE ddate_C >= \'' + yearBegin + '\' AND ddate_C <= \'' + yearEnd + '\' GROUP BY KH) a ' +
  'LEFT JOIN(SELECT KH,SUM(nMoney) AS monthlj FROM URDailyorders WHERE ddate_C >= \'' + beginDate + '\' AND ' +
  'ddate_C <= \'' + endDate + '\' GROUP BY KH) b ON a.KH=b.KH)  c GROUP BY c.customer WITH ROLLUP', resResult);

});

module.exports = router;
