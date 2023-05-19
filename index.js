const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const quiz = require('./quiz.js');

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(cookieParser());

app.use(session({
    secret: "Shh, its a secret!",
    saveUninitialized: true,
    resave: false
}));

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', function (req, res) {
    return res.render("index_view");
});

//both index.js and quiz.js should be in same directory
app.use('/quiz', quiz);
app.listen(4000, () => console.log(`Server Running at port 4000`));