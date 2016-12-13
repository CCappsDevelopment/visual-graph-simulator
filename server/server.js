var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");
var routes = require("./routes");

var app = express();

// Serve Static Directories
app.use("/angular", express.static(path.join(__dirname, "../node_modules/angular")));
app.use("/views", express.static(path.join(__dirname, "../client/views")));
app.use("/controllers", express.static(path.join(__dirname, "../client/controllers")));
app.use("/directives", express.static(path.join(__dirname, "../client/common/directives")));
app.use("/services", express.static(path.join(__dirname, "../client/common/services")));
app.use("/jquery", express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use("/bootstrap", express.static(path.join(__dirname, "../node_modules/bootstrap/dist")));
app.use("/font-awesome", express.static(__dirname + "/../node_modules/font-awesome"));
app.use("/img", express.static(path.join(__dirname, "../client/img")));
app.use("/css", express.static(path.join(__dirname, "../client/css")));
app.use(express.static(path.join(__dirname, "../client/views")));
app.use(bodyParser.json());

app.use("/", routes);

var port = process.env.PORT || 8080;
app.listen(port);
console.log(`Server running on port ${port}...`);

module.exports = app;
