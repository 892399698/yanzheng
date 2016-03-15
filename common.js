var crypto = require('crypto');
var common = {
    md5: function(content) {
        var content = content;
        if (!content) {
            return content;
        }
        var md5 = crypto.createHash('md5');
        md5.update(content);
        var d = md5.digest("hex");
        return d;
    },
    getClientIp: function(req) {
        return req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
    }
}


module.exports = common;
