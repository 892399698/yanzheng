var express = require("express");
var mongoose = require("mongoose");
var config = require("../config");
var Num=require("../model/num");
var NumRecord=require("../model/num_record");
var common=require("../common");
var router = express.Router();
var InfoSchema = mongoose.Schema({
    dateTime: Date,
    ip: String,
})
router.get("/:path", function(req, res) {
    console.log(req.params.path)
    res.render("routers/index", { title: "测试" });
})
router.post("/:path", function(req, res) {
    var pre = config.pre_base;
    // console.log(pre)
    var num=req.body.number;
    if(!num){
        res.send({
            code:2000,
            msg:"查询号码不能为空!"
        })
    }
    mongoose.connect('mongodb://localhost/herun');
    // mongoose.connect('mongodb://localhost/' + pre + "index");
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function(callback) {
        // yay!
        var ip=common.getClientIp(req);
        Num.findOne({
            serial_number:num
        },function(err,doc){
            if(err){
                res.send({
                    code:2000,
                    msg:"查询失败,请重试!"
                })
                db.close();
                return false;
            }
            if(doc && doc._id){
                var id=doc._id;
                NumRecord.find({
                    num_id:id
                },function(err,docs){
                    if(err){
                        res.send({
                            code:2000,
                            msg:"查询失败,请重试!"
                        })
                        db.close();
                        return false;
                    }
                    var record =new NumRecord({
                        ip:ip,
                        num_id:id
                    });
                    console.log(record)
                    record.save(function(err){
                        if(err){
                            console.log(err)
                        }
                        if(docs && docs.length){
                            res.send({
                                code:1000,
                                msg:"查询成功!",
                                data:docs[docs.length-1]
                            })
                        }else{
                            res.send({
                                code:1000,
                                msg:"查询成功!"
                            })

                        }
                        db.close();
                    })
                    
                    

                })
            }else{
                res.send({
                    code:2000,
                    msg:"您所查询的号码不存在!"
                })
                db.close();
                // var data=new Num({
                //     serial_number:num
                // })
                // data.save(function(err,doc){
                //     if(err){
                //         res.send({
                //             code:2000,
                //             msg:"创建"
                //         })
                //     }
                // })
                // var record =new NumRecord({
                //     ip:ip,
                //     num_id:
                // });
            }
        })
    });
   
})
module.exports = router
