var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Num = require("../model/num");

router.get("/", function(req, res) {
    // res.send({ code: 1000 })
    res.render("admin/index")
})
router.get("/number_list", function(req, res) {
    res.render("admin/number_list")
})
router.get("/number_list/new", function(req, res) {
    res.render("admin/number_list_new")
})
router.post("/number_list/new", function(req, res) {
    // res.render("admin/number_list_new")
    var data = req.body.numbers;
    if (!data) {
        res.send({
            code: 2000,
            msg: "号码不能为空!"
        })
    }
    mongoose.connect('mongodb://localhost/herun');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, '连接mongo数据库错误:'));
    db.once('open', function() {
        var arr = data.split(/\n+/);
        var errs = [];
        for (var i = 0, l = arr; i < l; i++) {
            // Num.findOne({ serial_number: arr[i] }, function(err, doc) {
                // if (err) {
                //     errs.push(arr[i] + err);
                //     return false;
                // }
                // if (!doc) {
                    var data = new Article({
                        serial_number: arr[i]
                    });
                    data.save(function(err, doc) {
                      if(err){
                        errs.push(arr[i] + err);
                        return false;
                      }
                    })
                // }


            // })

        }
        res.send({
          code:1000,
          msg:"处理完成",
          errs:errs
        })
        //循环结束


    })


    // res.send({
    //     code: 1000,
    //     msg: arr
    // })
})
module.exports = router
