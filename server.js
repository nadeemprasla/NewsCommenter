var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var PORT = 3000
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";


var app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./controller/getapi")(app)


app.listen(PORT, () => console.log("App running on port ", PORT, "!"))