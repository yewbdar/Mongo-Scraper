var express = require("express");
var bodyParser = require("body-parser");
var handlbar = require("express-handlebars");
var routes = require("./controllers/app_route");
var mongoose = require("mongoose");
var path = require("path");
var app = express();

app.use(express.static(path.join(__dirname,'public')));
// app.use(express.static("public"));
var PORT = process.env.PORT || 3000
// //bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newyorknews");

// //handelbars
app.engine("handlebars", handlbar({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// //router
app.use('/', routes);


//start server

app.listen(PORT, function () {
    console.log("server start " + PORT)
})



