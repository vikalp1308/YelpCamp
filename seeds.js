var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
  
var data = [
    {
        name: "Birds", 
        image: "https://images.unsplash.com/photo-1506869730304-be7d5430e841?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Hey!! There is a pair of birds"
    },
    {
        name: "Cake", 
        image: "https://images.unsplash.com/photo-1588531154860-2f33615bf44e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Hey!! There is picture of a delicious cake "
    },
    {
        name: "Nature", 
        image: "https://images.unsplash.com/photo-1588591451327-d1101da36a5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Hey!! There is a picture of nature"
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Campground.deleteMany({}, function(err){
    	if(err){
    		console.log(err);
    	}
    	console.log("removed campgrounds!");
    	Comment.deleteMany({}, function(err) {
    	if(err){
    		console.log(err);
    	}
    	console.log("removed comments!");
    	//add a few campgrounds
    	data.forEach(function(seed){
    	Campground.create(seed, function(err, campground){
    	if(err){
    		console.log(err)
    	} else {
    		console.log("added a campground");
    		//create a comment
    		Comment.create(
    		{
    			text: "This place is great, but I wish there was internet",
    			author: "Vikalp"
    		}, function(err, comment){
    		if(err){
    			console.log(err);
    		} else {
    			campground.comments.push(comment);
    			campground.save();
    			console.log("Created new comment");
    		}
    	});
    	}
    	});
    	});
    	});
    	}); 
	}
 
module.exports = seedDB;