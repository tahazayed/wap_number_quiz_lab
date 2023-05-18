var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var survey = require('./survey.js');

var app = express();

app.use(cookieParser());
app.use(session({
    secret: "Shh, its a secret!",
    saveUninitialized: true,
    resave: false
}));

app.get('/', function (req, res) {
    if (req.session.page_views) {
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
    } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }
});

//both index.js and things.js should be in same directory
app.use('/survey', survey);
app.listen(4000, () => console.log(`Server Running at port 4000`));