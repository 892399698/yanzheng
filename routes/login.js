var express = require("express");
var mongoose = require("mongoose");
// var config = require("../config");
var router = express.Router();
router.get("/", function(req, res) {
    console.log(req)
    res.send({
        msg: "成功"
    })
})


module.exports = router
