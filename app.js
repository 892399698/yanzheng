var express = require('express');
var app = express();
var routers = require('./routes/routers');
var login = require('./routes/login');
var path = require('path');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));  


app.use('/routers', routers);
app.use('/login', login);
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.send('Hello World!');
});

var server = app.listen(3300, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
