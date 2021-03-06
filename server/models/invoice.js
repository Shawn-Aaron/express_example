/**
 * Created by 菅晓凯 on 2017-12-06.
 * 开票情况
 */
var express = require('express');

var router = express.Router();
var dao = require('../db/dao.js');
var moment = require('moment');
var webUtil = require('../common/util/WebUtil.js');
router.get('/invoice', function(req, res, next) {
    //获取并配置查询相关参数
    var page = req.query.page == undefined? 1:req.query.page;
    var size = req.query.size == undefined? 10:req.query.size;
    var date = req.query.date == undefined? moment().format('YYYY-MM-DD'):moment(req.query.date).format('YYYY-MM-DD');
    //设置查询起始截止时间
    var beginDate = date.substring(0,8) + '01 00:00:00';
    var endDate = moment(date).endOf('month').format('YYYY-MM-DD') + " 23:59:59";
    var monthSearch = moment(date).format('YYYY年MM月');
    var yearBegin = date.substring(0,4) + '-01-01 00:00:00';
    var yearEnd = date.substring(0,4) + '-12-31 23:59:59';
    var yearSearch = moment(date).format('YYYY年');
    //获取业务员姓名
    var salesman = '朱磊';

    var unInvoiceSql = 'SELECT cdwmc customer,nNoMoney_AZ text,nNoMoney_1 type1,nNoMoney_2 type2,nNoMoney_3 type3,(nNoMoney_4+nNoMoney_5+nNoMoney_6) type4 FROM URskNoInvoice_count_month WHERE cName_Seller=\'何宁\'';
    var invoiceSql = 'SELECT a.customer,ISNULL(Convert(decimal(18,2),b.month),0) AS month,ISNULL(Convert(decimal(18,2),a.year),0) AS year FROM (SELECT KH customer,SUM(nMoney) year FROM URskInvoice_month WHERE cmonth LIKE \''+yearSearch+'%\' AND YW=\'何宁\' GROUP BY KH) a LEFT JOIN (SELECT KH customer,SUM(nMoney) month FROM URskInvoice_month WHERE cmonth=\''+monthSearch+'\' AND YW=\'何宁\' GROUP BY KH) b ON a.customer=b.customer';

    var resultMap = {};
    //查询回调函数
    function resUnInvoiceResult(error, recordInfo, affected){
        //返回数据
        //res.json(200,webUtil.formatResult(recordInfo));
        //res.json(200,recordInfo.recordset);
        resultMap.unInvoiceInfo = recordInfo.recordset;
        dao.queryByPage(page,size,'',invoiceSql, resInvoiceResult);
    }

    function resInvoiceResult(error, recordInfo, affected){
        resultMap.invoiceInfo = recordInfo.recordset;
        res.json(200,resultMap);
    }

    //查询未开票数据
    dao.queryByPage(page,size,'',unInvoiceSql, resUnInvoiceResult);
});

module.exports = router;

