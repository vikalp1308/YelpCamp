var express = require("express"),
	router  = express.Router(),
	passport = require("passport"),
	User = require("../models/user");

//Root Route
router.get("/",function(req,res){
	res.render("landing");
});

// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//Handle Sign Up Logic
router.post("/register",function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err,user){
		if(err){
    		console.log(err);
    		return res.render("register", {error: err.message});
        }
		passport.authenticate("local")(req,res,function(){
			req.flash("success", "Welcome to Yelpcamp " + user.username);
			res.redirect("/campgrounds");
		})
	})
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

// Handle Login Logic
router.post("/login", passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login",
}),function(req,res){
	
});


//LogOut Route
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","You Logged Out!");
	res.redirect("/campgrounds");
});


module.exports = router;
