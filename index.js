var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var routs = require('./routs.js');

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(cookieParser());
app.use(session({
    secret: "Shh, its a secret!",
    saveUninitialized: true,
    resave: false
}));

app.get('/', function (req, res) {
    res.end("<a href=\"/survey/q/1\">Start Survey</a>");

});

//both index.js and things.js should be in same directory
app.use('/survey', routs);
app.listen(4000, () => console.log(`Server Running at port 4000`));