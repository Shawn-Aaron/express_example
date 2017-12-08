/**
 * Created by 菅晓凯 on 2017-12-01.
 * 发货情况
 */
 var express = require('express');

 var router = express.Router();
 var dao = require('../db/dao.js');
 var moment = require('moment');
 var webUtil = require('../common/util/WebUtil.js');
 router.get('/sendgoods', function(req, res, next) {
   //获取并配置查询相关参数
   var page = req.query.page == undefined? 1:req.query.page;
   var size = req.query.size == undefined? 10:req.query.size;
   var date = req.query.date == undefined? moment().format('YYYY-MM-DD'):moment(req.query.date).format('YYYY-MM-DD');
   //设置查询起始截止时间
   var beginDate = date.substring(0,8) + '01 00:00:00';
   var endDate = moment(date).endOf('month').format('YYYY-MM-DD') + " 23:59:59";
   var yearBegin = date.substring(0,4) + '-01-01 00:00:00';
   var yearEnd = date.substring(0,4) + '-12-31 23:59:59';
   //获取业务员姓名
   var salesman = '朱磊';

   //查询回调函数
   function resResult(error, recordInfo, affected){
     //返回数据
     //res.json(200,webUtil.formatResult(recordInfo));
     res.json(200,recordInfo.recordset);
   }
   //查询发货情况
   dao.queryByPage(page,size,"",'SELECT ISNULL(a.KH,\'合计\') customer,ISNULL(Convert(decimal(18,2),SUM(b.text)/10000.00),0) AS ' +
   'text,Convert(decimal(18,2),SUM(a.type)/10000.00) AS type FROM (SELECT KH,SUM(nMoney) AS type FROM urdailyfnout ' +
   'WHERE YW=\'' + salesman + '\' AND ddate_out >= \'' + yearBegin + '\' AND ddate_out <= \'' + yearEnd + '\' GROUP BY KH) a LEFT JOIN ' +
   '(SELECT TOP 10 KH,SUM(nMoney) AS text FROM URDailyfnout WHERE YW=\'' + salesman + '\' AND ddate_out >= \'' + beginDate + '\' AND ' +
   'ddate_out <= \'' + endDate + '\' GROUP BY KH) b ON a.KH=b.KH  GROUP BY a.KH WITH ROLLUP', resResult);

 });

 module.exports = router;

