var express = require('express');
var router = express.Router();
//var dao = require('../server/db/dao.js');
/* GET home page. */
router.get('/test', function(req, res, next) {
    //function getInfo(error, recordInfo, affected){
    //  //console.log("数据行数" + recordInfo.recordsets.length);
    //  //if(recordInfo.recordsets.length > 1){
    //  //  console.log("数据行数" + recordInfo.recordsets.length);
    //  //}
    //  res.json(recordInfo);
    //}
    //dao.query('SELECT TOP 3* FROM URDailyorders WHERE cmonth LIKE  \'%2017%\'', getInfo);
    res.json({info:'测试信息'});
});

module.exports = router;
