var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Yellow camp", image: "https://www.photosforclass.com/download/px_699558"},
        {name: "Red camp", image: "https://www.photosforclass.com/download/px_2422265"},
        {name: "Purple camp", image: "https://www.photosforclass.com/download/px_2398220"}
    ]
    // This is the name (whatever) we give it:data pass in
    // Common they are the same
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(3000, function(){
    console.log("The YelpCamp Server Has Started");
});