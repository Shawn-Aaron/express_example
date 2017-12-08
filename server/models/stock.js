/**
 * Created by 菅晓凯 on 2017-12-05.
 * 库存情况
 */
var express = require('express');

var router = express.Router();
var dao = require('../db/dao.js');
var moment = require('moment');
var webUtil = require('../common/util/WebUtil.js');
router.get('/stock', function(req, res, next) {
    //获取并配置查询相关参数
    var page = req.query.page == undefined? 1:req.query.page;
    var size = req.query.size == undefined? 10:req.query.size;
    var customer = req.query.customer == undefined ? "" : req.query.customer;
    var batchCode = req.query.batchCode == undefined ? "" : req.query.batchCode;
    var productNae = req.query.productNae == undefined ? "" : req.query.productNae;
    //获取业务员姓名
    var salesman = '朱磊';

    var sqlWhere = " cname1='" + salesman + "'";
    if(!webUtil.isEmptyString(customer)){
        sqlWhere += " and cname2='" + customer + "'";
    }
    if(!webUtil.isEmptyString(batchCode)){
        sqlWhere += " and cBatchCode='" + batchCode + "'";
    }
    if(!webUtil.isEmptyString(productNae)){
        sqlWhere += " and cName='" + productNae + "'";
    }
    var sql = "SELECT cname2 AS  customer,cBatchCode AS  text,cName AS  name,ISNULL(nAmount,0) AS number,0 AS xiangshu," +
        "Ddate_max AS lastdate,kL AS age FROM URTempfnSubstance_CQ_month WHERE " + sqlWhere;

    //查询回调函数
    function resResult(error, recordInfo, affected){
        //返回数据
        //res.json(200,webUtil.formatResult(recordInfo));
        res.json(200,recordInfo.recordset);
    }
    //查询发货情况
    dao.queryByPage(page,size,sql, resResult);

});

module.exports = router;

