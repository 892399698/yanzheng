var express = require("express");
var mongoose = require("mongoose");
var common = require("../common");
var AdminSchema = mongoose.Schema({
    name: String,
    password: String,
    login_time: Date
}, {
    collection: "admin"
})
var Admin = mongoose.model('admin', AdminSchema)
    // var config = require("../config");
var router = express.Router();
router.get("/", function(req, res) {
    // res.send({
    //     msg: "成功"
    // })
    res.render("login")
})
router.post("/", function(req, res) {

    console.log(req.body);
    var u = req.body.username,
        p = req.body.password;
    if (!u || !p) {
        res.send({
            code: 2000,
            msg: "用户名或密码不能为空"
        })
        return
    }
    mongoose.connect('mongodb://localhost/herun');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, '连接mongo数据库错误:'));
    db.once('open', function(callback) {
        // yay!
        Admin.findOne({ name: u }, function(err, doc) {
            if (err) return console.error(err);
            // console.log( doc)
            if (doc && common.md5(p) === doc.password) {
                req.session.user = doc;
                res.send({
                    code: 1000,
                    msg: "登陆成功!"
                })
            } else {
                req.session.error="用户名或密码错误"
                res.send({
                    code: 2000,
                    msg: "用户名或密码错误!",
                    // p:common.md5(p)
                })

            }
            db.close();
        })

    });

})

module.exports = router
