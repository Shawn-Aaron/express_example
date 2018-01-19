/**
 * Created by 菅晓凯 on 2017-12-20.
 * 信用情况
 */
var express = require('express');

var router = express.Router();
var dao = require('../db/dao.js');
var moment = require('moment');
var webUtil = require('../common/util/WebUtil.js');
router.get('/production', function(req, res, next) {
    //获取并配置查询相关参数
    var page = req.query.page == undefined? 1:req.query.page;
    var size = req.query.size == undefined? 10:req.query.size;
    var customer = req.query.customer == undefined ? "" : req.query.customer;
    var batchCode = req.query.batchCode == undefined ? "" : req.query.batchCode;
    var productName = req.query.productName == undefined ? "" : req.query.productName;
    //获取业务员姓名
    var salesman = '朱磊';

    var sqlWhere = " 1=1";
    if(!webUtil.isEmptyString(customer)){
        sqlWhere += " and customer='" + customer + "'";
    }
    if(!webUtil.isEmptyString(batchCode)){
        sqlWhere += " and number='" + batchCode + "'";
    }
    if(!webUtil.isEmptyString(productName)){
        sqlWhere += " and name='" + productName + "'";
    }

    var productionSql = 'SELECT * FROM Production WHERE ' + sqlWhere;

    //查询回调函数
    function resProductionResult(error, recordInfo, affected){
        //返回数据
        //res.json(200,webUtil.formatResult(recordInfo));
        res.json(200,recordInfo.recordset);
    }

    //查询未开票数据
    dao.queryByPage(page,size,'',productionSql, resProductionResult);


});

module.exports = router;

