/**
 * Created by 菅晓凯 on 2017-12-20.
 * 信用情况
 */
var express = require('express');

var router = express.Router();
var dao = require('../db/dao.js');
var moment = require('moment');
var webUtil = require('../common/util/WebUtil.js');
router.get('/news', function(req, res, next) {
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

    var newsSql = 'SELECT * FROM news';

    //查询回调函数
    function resResult(error, recordInfo, affected){
        //返回数据
        //res.json(200,webUtil.formatResult(recordInfo));
        res.json(200,recordInfo.recordset);
    }

    //查询未开票数据
    dao.queryByPage(page,size,'',newsSql, resResult);


});

module.exports = router;

