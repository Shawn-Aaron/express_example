// 集成路由
module.exports = function(app) {

    //业务路由
    app.use('/test',require('../server/models/test'));
    app.use('/orders', require("../server/models/orders"));
};