'use strict';

/**
 * Created by ekerot on 2016-12-17.
 */

let express = require('express');
let app = express();
let hbs = require('express-handlebars');
let path = require('path');
let bodyParser = require('body-parser');
let mongoose = require('./config/mogoose');
let session = require('express-session')

let port = process.env.PORT || 3000;

app.engine('handlebars', hbs({
    defaultLayout: 'main',
    layoutDir: __dirname + '/views/layouts',
    partialsDir  : [__dirname + '/views/partials',]
}));

app.set('view engine', 'handlebars');

mongoose();  //start db

//parsing json and form data
app.use(bodyParser.urlencoded({ extended: true }));

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name:   "eonsuperduperseesiongeneratorstuff",
    secret: "kissmehoneyhoneykissme8923JKSKJS89wejjkj84DjDKD",
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false,
        httpOnly: true,
    },
    maxAge: 3600000
}));

app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

//use flash messages
app.use(function(request, response, next) {
    if(request.session.flash) {
        response.locals.flash = request.session.flash;
        delete request.session.flash;
    }
    next();
});

//routes
app.use('/', require('./routes/main.js'));
app.use('/', require('./routes/register.js'));
app.use('/', require('./routes/userSession.js'));

//errors on server
app.use((req, res) => res.status(404).render('errors/404'));

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(400).render('errors/400')
});

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).render("errors/500");
});


//console what port that the app uses
app.listen(port, () => console.log(`Express app listening on port ${port}!`
    + '\nIf you want to terminate press ctrl+c'));
