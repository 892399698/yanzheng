var express = require('express');
var app = express();
var logout = require('./routes/logout');
var routers = require('./routes/routers');
var login = require('./routes/login');
var admin = require('./routes/admin');
var path = require('path');
var bodyParser = require("body-parser");
//session
var session = require('express-session');
app.use(session({
    secret: 'herunshiti',
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));
app.use(bodyParser.urlencoded({ extended: false }));



// app.use(function(req,res,next){ 
//     res.locals.user = req.session.user;   // 从session 获取 user对象
//     var err = req.session.error;   //获取错误信息
//     delete req.session.error;
//     res.locals.message = "";   // 展示的信息 message
//     if(err){ 
//         res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
//     }
//     next();  //中间件传递
// });

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.send('Hello World!');
});
app.use('/routers', routers);

app.use(function(req, res, next) {
    console.log(req.session.user)
    console.log(req.url)
    if (!req.session.user) {
        if (req.url == "/login") {
            console.log("do")
            next(); //如果请求的地址是登录则通过，进行下一个请求
        } else {
            console.log("do1")

            res.redirect('/login');
        }
    } else if (req.session.user) {
        console.log("do2")

        next();
    }
});
app.use('/login', login);
app.use('/admin', admin);
app.use('/logout', logout);
var server = app.listen(3300, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
