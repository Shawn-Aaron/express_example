var test = require('../server/models/test.js');
// 集成路由
module.exports = function(app) {

    //业务路由
    //app.use('/',test);
    app.get('/orders', require("../server/models/orders"));
    app.get('/sendgoods', require("../server/models/stockout"));
    app.use('/', require("../server/models/stock"));
    app.get('/invoice', require("../server/models/invoice"));
    app.get('/gathering', require("../server/models/gathering"));
    app.get('/credit', require("../server/models/credit"));
    app.get('/production', require("../server/models/production"));
    app.get('/birthday', require("../server/models/birthday"));
    app.get('/news', require("../server/models/news"));
};