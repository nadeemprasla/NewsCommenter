var db = require("../models");

module.exports = function (app) {


    app.get("/", (req, res) => {
        res.render("index")
    })      

    app.get("/scrape", (req, res) => {
        res.send("hello")
    })

    app.get("/test", (req, res) => {

    })
    app.get("*", (req, res) => {
        // res.render("index")
    })

}