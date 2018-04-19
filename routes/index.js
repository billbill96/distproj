var express = require('express');
var router = express.Router({ mergeParams: true });
var passport = require("passport");
var user = require('../models/user');
var post = require('../models/post');

router.get('/',function(req,res){
    //res.render('home');
    post.Post.findOne({}, function(err, data) {
        res.render('home', {
            canteen : data,
            worksp : data
        })
    })
});

router.get('/newstory',isLoggedIn,function(req,res){
    res.render('newstory');
})

router.post('/newstory',function(req,res){
    //console.log(req.body.topic);
    var newpost = new post.Post({ 
        topic: req.body.topic,
        type : req.body.type, //canteen,worksp
        location: req.body.location, //lek,yai
        faculty : req.body.faculty,
        image: req.body.image,
        description : req.body.description, //comment
        date : Date.now(),
        user : res.locals.currentUser.username,
     });
     console.log(newpost);
     post.Post.create(newpost,function(err,post){
         if(err){
             console.log(err);
         }
         else{
            res.redirect('/mystory');
           // res.redirect('/');
         } 
     }) 
})
router.get('/editstory/:id',function(req,res){
    post.Post.findById(req.params.id, function (err, data) {
        if (err) {
            console.log(err);
        } else {
           // console.log(req.params.id);
            res.render('editstory', { 
                post: data 
            });
           //res.redirect("/");
         }
    });
})

router.post('/editstory/:id',function(req,res){
    //console.log(req.params.id);
    //console.log(req.body.topic);
    var newvalues = {$set: {
        topic: req.body.topic,
        type : req.body.type, //canteen,worksp
        location: req.body.location, //lek,yai
        faculty : req.body.faculty,
        image: req.body.image,
        description : req.body.description, //comment
        date : Date.now(),
        }}; 
     post.Post.findByIdAndUpdate(req.params.id, newvalues ,{ new: true }, function(err) {
        if (err) {
            console.log(err);
        } else {
           // console.log(req.params.id);
            res.redirect('/mystory');
        } 
      }) 
    })
    
router.get('/deletestory/:id',function(req,res){
    post.Post.remove( {_id: req.params.id} ,function(err){
        if (err) {
            console.log(err);
        } else {
           // console.log(req.params.id);
           res.redirect('/mystory');
        } 
    }
    );
})
router.get('/mystory',function(req,res){
    //console.log(req.user);
    post.Post.find({'user': req.user.username},function(err,data){
        res.render('mystory',{
            allpost : data
        })
    })
})
router.get('/canteenlek',function(req,res){
    post.Post.find({'location': 'lek','type':'canteen'}, function(err, data) {
        res.render('showallcanteen', {
            canteen : data
        })
    })
   // res.render('showallcanteen');
})
router.get('/canteenyai',function(req,res){
    post.Post.find({'location': 'yai','type':'canteen'}, function(err, data) {
        res.render('showallcanteen', {
            canteen : data
        })
    })
   // res.render('showallcanteen');
})
router.get('/worksplek',function(req,res){
    post.Post.find({'location': 'lek','type':'worksp'}, function(err, data) {
        res.render('showallwksp', {
            worksp : data
        })
    })
   // res.render('showallcanteen');
})
router.get('/workspyai',function(req,res){
    post.Post.find({'location': 'yai','type':'worksp'}, function(err, data) {
        res.render('showallwksp', {
            worksp : data
        })
    })
   // res.render('showallcanteen');
})
router.get("/show/:id", function (req, res) {
    //console.log(req.params.id);
    post.Post.findById(req.params.id, function (err, data) {
        if (err) {
            console.log(err);
        } else {
           // console.log(req.params.id);
            res.render('show', { post: data });
        }
    });
})
router.get("/showmystory/:id", function (req, res) {
    //console.log(req.params.id);
    post.Post.findById(req.params.id, function (err, data) {
        if (err) {
            console.log(err);
        } else {
           // console.log(req.params.id);
            res.render('showplusedit', { post: data });
        }
    });
})
router.get('/show',function(req,res){
    res.render('show');
})

router.get('/contact',function(req,res){
    res.render('contact');
})

router.get('/login',function(req,res){
    res.render('login');
})
router.post('/login', passport.authenticate('local',
    {   
        successRedirect: '/',
        failureRedirect: '/login'
    
    }), function (req, res) {
       console.log(req.body.username);
})


router.get('/signup',function(req,res){
   // res.send('signup');
    res.render('signup');
})
router.post('/signup',function(req,res){
    console.log(req.body.username+' '+req.body.email);
    var newUser = new user({ username: req.body.username, email: req.body.email });
    user.User.register(newUser, req.body.password, function (err, user) {
        if (err) { //if username has been in DB คือมีชื่อซ้ำ
            console.log(err);
            //return res.send('cant regis');
            res.render('cantsignup');
        }
        //Can register
        passport.authenticate('local')(req, res, function () {
            //res.send('can regis');
            res.render('cansignup');
        })
    }); 
})

router.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router ;
