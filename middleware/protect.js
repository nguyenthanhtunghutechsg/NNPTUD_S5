var ResHelper = require('../helper/ResponseHandle');
var jwt = require('jsonwebtoken');
var configs = require('../configs/config')
var userModel = require('../schemas/user')

module.exports = async function (req, res, next) {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1];
    } else {
        if (req.cookies.token) {
            token = req.cookies.token;
        }
    }
    if (!token) {
        ResHelper.ResponseSend(res, false, 404, "vui long dang nhap")
        return;
    }
    try {
        let result = jwt.verify(token, configs.SECRET_KEY);
        if (result.exp * 1000 > Date.now()) {
            let user = await userModel.findById(result.id);
            req.user = user;
            next();
        } else {
            ResHelper.ResponseSend(res, false, 404, "vui long dang nhap")
        }
    } catch (error) {
        ResHelper.ResponseSend(res, false, 404, "vui long dang nhap")
    }
}