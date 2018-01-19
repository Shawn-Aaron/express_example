/**
 * Created by 菅晓凯 on 2017-12-06.
 * 收款情况
 */
var express = require('express');

var router = express.Router();
var dao = require('../db/dao.js');
var moment = require('moment');
var webUtil = require('../common/util/WebUtil.js');
router.get('/gathering', function(req, res, next) {
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

    var unInvoiceSql = 'SELECT cdwmc customer,nMoney_QK_count text,nMoney_QK_count1 type1,nMoney_QK_count2 type2,nMoney_QK_count3 type3,(nMoney_QK_count4+nMoney_QK_count5+nMoney_QK_count6) type4 FROM URskInvoice_count_month WHERE cperiod_P=\'2017年09月\' AND cName_Seller=\'何宁\'';
    var receiveSql = 'SELECT a.customer,0.00 mplan,ISNULL(Convert(decimal(18,2),b.receive),0) AS receive,0.00 mcomplete,ISNULL(Convert(decimal(18,2),a.yreceive),0) AS yreceive FROM (SELECT KH customer,SUM(nMoney) yreceive FROM URskReceive_month WHERE cmonth LIKE \'2017年%\' AND YW=\'何宁\' GROUP BY KH) a LEFT JOIN (SELECT KH customer,SUM(nMoney) receive FROM URskReceive_month WHERE cmonth=\'2017年11月\' AND YW=\'何宁\' GROUP BY KH) b ON a.customer=b.customer';

    var resultMap = {};
    //查询回调函数
    function resUnInvoiceResult(error, recordInfo, affected){
        //返回数据
        //res.json(200,webUtil.formatResult(recordInfo));
        //res.json(200,recordInfo.recordset);
        resultMap.unInvoiceInfo = recordInfo.recordset;
        dao.queryByPage(page,size,'',receiveSql, resReceiveResult);
    }

    function resReceiveResult(error, recordInfo, affected){
        resultMap.receiveInfo = recordInfo.recordset;
        res.json(200,resultMap);
    }

    //查询未开票数据
    dao.queryByPage(page,size,'',unInvoiceSql, resUnInvoiceResult);


});

module.exports = router;

