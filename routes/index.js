var express = require('express');
var router = express.Router();
var dao = require('../db/dao.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(dao.direction);
  //res.render('index', { title: 'Express' });
  //res.json({name: 1});
  function getInfo(error, recordInfo, affected){
    console.log("数据行数" + recordInfo.recordsets.length);
    if(recordInfo.recordsets.length > 1){
      console.log("数据行数" + recordInfo.recordsets.length);
    }
    res.json(recordInfo.recordsets);
  }
  dao.query('SELECT TOP 3* FROM edajia..AMS_WEB_AliPay_Temp ORDER BY dtReg desc', getInfo);
  //dao.query('SELECT TOP 3* FROM edajia..AMS_WEB_AliPay_Temp ORDER BY dtReg desc',function(erro,recordsets){
  //  console.log(recordsets);
  //  res.json(recordsets);
  //});
});

module.exports = router;
