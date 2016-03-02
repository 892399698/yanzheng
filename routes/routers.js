var express = require("express");
var mongoose = require("mongoose");
var config=require("config");
var router = express.Router();

router.get("/:path", function(req, res) {
  console.log(req.params.path)
  res.render("routers/index",{title:"测试"});
})
router.post("/:path",function(req,res){
  var pre=config.pre_base;
  console.log(pre)
  mongoose.connect('mongodb://localhost/'+pre+"index");
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function (callback) {
    // yay!
  });

  res.send({
    code:1000,
    msg:"成功"
  })
})
module.exports = router
