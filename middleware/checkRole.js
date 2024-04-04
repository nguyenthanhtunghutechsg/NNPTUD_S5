var ResHelper = require('../helper/ResponseHandle');
module.exports = function (...roles) {
    return function (req, res, next) {
        let required = roles.map(e => e.toLowerCase());
        let role = req.user.role.map(e => e.toLowerCase());
        let result = required.filter(e => role.includes(e));
        if (result.length > 0) {
            next()
        } else {
            ResHelper.ResponseSend(res, false, 403, "ban khong co quyen")
        }
    }
}