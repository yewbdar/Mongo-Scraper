var express = require("express");
var bodyParser = require("body-parser");
var handlbar = require("express-handlebars");
var routes = require("./controllers/app_route");
var mongoose = require("mongoose");
var path = require("path");
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

var PORT = process.env.PORT || 3000
//bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to the Mongo DB

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
// mongoose.connect("mongodb://localhost/newyorknews");

//handelbars
app.engine("handlebars", handlbar({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//router
app.use('/', routes);


//start server

app.listen(PORT, function () {
    console.log("server start " + PORT)
})



