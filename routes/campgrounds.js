var express     = require("express"),
	router      = express.Router(),
	Campground  = require("../models/campground"),
	middleware  = require("../middleware");

//INDEX - Show All allCampgrounds
//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
       }
    });
});

//NEW - Show Form To Create New Campground
router.get("/new",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			res.redirect("/campgrounds")
		}else{
			res.render("campgrounds/new", {campground: foundCampground});
		}
	})	
});

//CREATE - Add New Comment To DB
router.post("/",middleware.isLoggedIn,function(req,res){
	var name = req.body.name;
	var price =req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author= {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name , price: price, image: image, description: desc, author:author}
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			req.flash("success", "Successfully added Campground");
			console.log(newlyCreated);
			res.redirect("/campgrounds")
		}
	});
});

//SHOW - Show More Info About One Campground
router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
			console.log(req.params.id)
			// res.redirect("/campgrounds");
		}else{
			console.log(foundCampground)
			res.render("campgrounds/show",{campground: foundCampground});
		}
	});
});

//EDIT Campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
	Campground.findById(req.params.id,function(err, foundCampground){
			res.render("campgrounds/edit",{campground: foundCampground});
	});
});

//UPDATE Campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground,function(err, updateCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			req.flash("success", "Campground Edited");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DELETE Campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			req.flash("success", "Campground deleted");
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;