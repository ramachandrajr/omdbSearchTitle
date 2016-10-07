var express = require("express");
var app = express();
var request = require("request");

// Movie data object.
var movieData;

// Also serve assets.
app.use(express.static('assets'));
// Default view engine set to ejs.
app.set("view engine", "ejs");



// Results page, now doesn't contain results.
app.get("/results", function (req, res) {
	var search = req.query.movieSearch;
	var url = "http://www.omdbapi.com/?s=" + search;
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			movieData = JSON.parse(body);			
			res.redirect("/");
		}
	});
});

// Root page with search.
app.get("/", function (req, res) {
  res.render("search", {data: movieData});
});


// Listen to requests.
app.listen("3000", function () {
  console.log("Movie app has started!");
});
