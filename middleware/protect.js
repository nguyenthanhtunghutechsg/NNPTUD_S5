var ResHelper = require('../helper/ResponseHandle');
var jwt = require('jsonwebtoken');
var configs = require('../configs/config')

module.exports = function (req, res, next) {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        ResHelper.ResponseSend(res, false, 404, "vui long dang nhap")
        return;
    }
    let token = req.headers.authorization.split(' ')[1];
    try {
        let result = jwt.verify(token, configs.SECRET_KEY);
        console.log(result);
        next();
    } catch (error) {
        ResHelper.ResponseSend(res, false, 404, "vui long dang nhap")
    }
}