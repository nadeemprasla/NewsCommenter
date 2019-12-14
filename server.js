const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const PORT = 3000
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoGamespot";


const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./controller/getapi")(app)


app.listen(PORT, () => console.log("App running on port ", PORT, "!"))