var express           =  require("express"),
app                   =  express(),
bodyParser            =  require("body-parser"),
mongoose              =  require("mongoose"),
Campground            =  require("./models/campground"),
Comment               =  require("./models/comment"),
User                  = require("./models/user"),
seedDB                =  require("./seeds"),
passport              = require("passport"),
LocalStrategy         = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose"),
methodOverride        = require("method-override"),
flash                 = require("connect-flash");

//Requring Routes
var commentRoutes    = require("./routes/comments"),
	campgroundRoutes =  require("./routes/campgrounds"),
	indexRoutes      = require("./routes/index");

// seedDB();
// mongoose.connect('mongodb://localhost:27017/yelp_camp_v5', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb+srv://Vikalp1308:RiyaKannu@cluster0-dujwe.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash())
app.locals.moment = require('moment');
//Passport Configuration

app.use(require("express-session")({
	secret: "I'm the best man in the world",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});
		
app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Server Has Started!");
});