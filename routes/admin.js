var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var moment=require("../public/lib/moment/moment")
var Num = require("../model/num");

router.get("/", function(req, res) {
    // res.send({ code: 1000 })
    // res.render("admin/index")
    res.redirect('/admin/number_list')
})
router.get("/number_list", function(req, res) {
    mongoose.connect('mongodb://localhost/herun');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, '连接mongo数据库错误:'));
    // db.createCollection("numbers",{max:2024})
    db.once('open', function(err) {
        if(err){
            res.send({
                code:5000,
                msg:"服务器故障!"
            })
            return ;
        }
        Num.find(function(err,doc){
            if(err){
                res.send({
                    code:2000,
                    msg:"查询错误"
                })
            }
            for(var i=0;i<doc.length;i++){
                doc[i].for_create_time=moment(doc[i].create_time).format("YYYY-MM-DD HH:mm:ss")
            }
            // console.log(moment)
            res.render("admin/number_list",{docs:doc.reverse()})
            db.close()
        })
    })
})
//编辑
router.post("/number_list/edit", function(req, res) {
    mongoose.connect('mongodb://localhost/herun');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, '连接mongo数据库错误:'));
    db.once('open', function(err) {
        if(err){
            res.send({
                code:5000,
                msg:"服务器故障!"
            })
            return ;
        }
        console.log(req.body)
        var id=req.body.id;
        var num=req.body.num;
        if(!id || !num){
            res.send({
                code:2000,
                msg:"id或号码不能为空!"
            })
        }
        Num.findOne({
            serial_number:num
        },function(err,doc){
            if(err){
                res.send({
                    code:2000,
                    msg:"查询同号码错误"
                })
            }
            if(doc){
                res.send({
                    code:2000,
                    msg:"号码已经存在!"
                })
                db.close()
            }else{
                var nums = new Num({
                    _id:id,
                    serial_number: num
                });
                nums.save(function(err,doc){
                    if(err){
                        res.send({
                            code:2000,
                            msg:"保存失败,请重试!"
                        })
                    }else{
                        res.send({
                            code:1000,
                            msg:"保存成功!"
                        })
                    }
                    
                    db.close()

                })
            }
            // for(var i=0;i<doc.length;i++){
            //     doc[i].for_create_time=moment(doc[i].create_time).format("YYYY-MM-DD HH:mm:ss")
            // }
            // res.render("admin/number_list",{docs:doc.reverse()})
        })
    })
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
                                        errs: errs,
                                        doc:doc
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

})
module.exports = router
