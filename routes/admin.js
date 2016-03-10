var express = require("express");
var router = express.Router();
router.get("/", function(req, res) {
    // res.send({ code: 1000 })
    res.render("admin/index")
})
router.get("/number_list",function(req,res){
  res.render("admin/number_list")
})
router.get("/number_list/new",function(req,res){
  res.render("admin/number_list_new")
})
module.exports = router
