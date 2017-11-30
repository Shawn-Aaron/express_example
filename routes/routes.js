var test = require('../server/models/test.js');
// 集成路由
module.exports = function(app) {

    //业务路由
    app.use('/',test);
    app.get('/orders', require("../server/models/orders"));
};