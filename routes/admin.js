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
    var numbers = req.body.numbers;
    if (!numbers) {
        res.send({
            code: 2000,
            msg: "号码不能为空!"
        })
    }
    mongoose.connect('mongodb://localhost/herun');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, '连接mongo数据库错误:'));
    // db.createCollection("numbers",{max:2024})
    db.once('open', function() {
        var arr = numbers.split(/\n+/) || [];
        var errs = [];
        var data = [];
        // for (var i = 0, l = arr.length; i < l; i++) {
        //     if (arr[i]) {
        //         data.push({
        //             serial_number: arr[i]
        //         })
        //     }
        // }
        // Num.create(data, function(err, docs) {
        //         if (err) {
        //             errs.push(err);
        //         }
        //         res.send({
        //             code: 1000,
        //             msg: "处理完成",
        //             errs: errs
        //         })
        //         db.close();
        //     })


        // var nums =new Num(data);
        var k = 0;
        for (var i = 0, l = arr.length; i < l; i++) {

            (function(arri) {
                console.log(arri)
                Num.findOne({ serial_number: arri }, function(err, doc) {
                    
                    var nums = new Num({
                        serial_number: arri
                    });
                    if (err) {
                        k++;
                        errs.push(err);
                        if (k == l) {
                            res.send({
                                code: 1000,
                                msg: "处理完成",
                                errs: errs
                            })
                            db.close();
                        }
                        // return false;
                    } else {
                        if (!doc) {
                            console.log("doc %s",doc)
                            console.log(nums)
                            nums.save(function(err, doc) {
                                k++;
                                if (err) {
                                    errs.push(err);
                                    // return false;
                                }
                                if (k == l) {
                                    res.send({
                                        code: 1000,
                                        msg: "处理完成",
                                        errs: errs
                                    })
                                    db.close();
                                }

                            })
                        } else {
                            k++;
                            if (k == l) {
                                res.send({
                                    code: 1000,
                                    msg: "处理完成",
                                    errs: errs
                                })
                                db.close();
                            }
                        }
                    }

                })
            })(arr[i])


        }
        // for (var i = 0, l = arr.length; i < l; i++) {
        // Num.findOne({ serial_number: arr[i] }, function(err, doc) {
        // if (err) {
        //     errs.push(arr[i] + err);
        //     return false;
        // }
        // if (!doc) {
        // console.log(arr[i])

        // nums.save(function(err, doc) {
        //   if(err){
        //     errs.push(arr[i] + err);
        //     return false;
        //   }
        //   res.send({
        //     code:1000,
        //     msg:"处理完成",
        //     errs:errs
        //   })
        //   db.close();
        // })
        // }


        // })

        // }
        // res.send({
        //   code:1000,
        //   msg:"处理完成",
        //   errs:errs
        // })
        // db.close();
        //循环结束


    })


    // res.send({
    //     code: 1000,
    //     msg: arr
    // })
})
module.exports = router
