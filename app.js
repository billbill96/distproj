var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var mongoose      = require('mongoose');
var passport      = require('passport');
var user          = require('./models/user');
var post          = require('./models/post');
var LocalStrategy = require('passport-local').Strategy;

var index  = require('./routes/index');
//var postroute = require('./routes/post');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/views'));

app.use(require("express-session")({
    secret: "Hi passport",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use(index);
//app.use(postroute);
mongoose.connect("mongodb://bill:123@ds115219.mlab.com:15219/project");
mongoose.Promise = global.Promise;
/*
post.create({
    topic: 'Reviewwwwww',
    type : 'canteen', //canteen,worksp
    location: 'lek', //lek,yai
    faculty : 'Science',
    image: 'https://www.gsp.uni-freiburg.de/institutions/chulalongkorn-university/UniversittBangkokIII.jpg',
    description : 'sooooobeautifullllll', //comment
    user : 'bill',
    //date : Date.now(),
},function(err,post){
    
    if(err){
        console.log(err);
    }
    else{
        console.log(post);
    }
})

*/
app.listen(process.env.PORT || 8080, function() {
    console.log("server running port:8080!");
});