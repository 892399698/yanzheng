// module.exports = function () {
var express = require("express");
var router = express.Router();
router.get('/', function(req, res) {
    req.session.user = null;
    req.session.error = null;
    res.redirect('/login');
});
// }
module.exports = router