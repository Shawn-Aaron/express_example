/**
 * Created by 菅晓凯 on 2017-12-01.
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
   var beginDate = date.substring(0,8) + '01 00:00:00';
   var endDate = moment(date).endOf('month').format('YYYY-MM-DD') + " 23:59:59";
   var yearBegin = date.substring(0,4) + '-01-01 00:00:00';
   var yearEnd = date.substring(0,4) + '-12-31 23:59:59';
   //查询回调函数
   function resOrders(error, recordInfo, affected){
     //返回数据
     res.json(200,webUtil.formatResult(recordInfo));
   }
   dao.queryByPage(page,size,"",'SELECT ISNULL(a.KH,\'合计\') customer,Convert(decimal(18,2),SUM(b.text)) AS text,Convert(decimal(18,2),SUM(a.type)) AS type FROM (SELECT KH,SUM(nMoney) AS type FROM urdailyfnout WHERE ddate_out >= \'' +  + '\' AND ddate_out <= '2017-12-31' GROUP BY KH) a LEFT JOIN (SELECT TOP 10 KH,SUM(nMoney) AS text FROM dbo.URDailyfnout WHERE ddate_out >= '2017-11-01' AND ddate_out <= '2017-11-30' GROUP BY KH) b ON a.KH=b.KH  GROUP BY a.KH WITH ROLLUP', resOrders);

 });

 module.exports = router;

