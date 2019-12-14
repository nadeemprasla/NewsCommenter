const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://np19549:nadeem1@ds353338.mlab.com:53338/heroku_xgp86fqw";


const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI,{
    useMongoClient: true
}, { useNewUrlParser: true });
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./controller/getapi")(app)


app.listen(PORT, () => console.log("App running on port ", PORT, "!"))