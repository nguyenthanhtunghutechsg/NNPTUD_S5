module.exports = {
    ResponseSend: function (res,success,code,data) {
        res.status(code).send({
            success: success,
            data: data
        })
    }
}