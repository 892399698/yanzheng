var express = require("express");
var router = express.Router();

router.get("/:path", function(req, res) {
  console.log(req.params.path)
  res.render("routers/index",{title:"测试"});
})

module.exports = router
