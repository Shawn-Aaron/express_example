var test = require('../server/models/test.js');
// 集成路由
module.exports = function(app) {

    //业务路由
    app.use('/',test);
    app.get('/orders', require("../server/models/orders"));
    app.get('/sendgoods', require("../server/models/stockout"));
    app.get('/stock', require("../server/models/stock"));
    app.get('/invoice', require("../server/models/invoice"));
};