const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function (app) {


    app.get("/", (req, res) => {
        res.render("index")
    })

    app.get("/scrape", (req, res) => {
        axios.get("http://www.gamespot.com").then((html) => {
            const $ = cheerio.load(html.data);

            let results = [];
            $("article.media-article").each(function (i, element) {
                var link = "http://www.gamespot.com" + $(element).children("a").attr("href");
                var title = $(element).find(".media-body").children("h3").text();
                var timestamp = $(element).find(".media-body").children("footer").children("time").text();
                var image = $(element).find("a").children("figure").find("img").attr("src");
                results.push({
                    title: title,
                    link: link,
                    time: timestamp,
                    image: image,
                    saved: false,
                    hearturl: "https://img.icons8.com/pastel-glyph/64/000000/like--v1.png"

                });
            });

            try {
                db.Articles.create(results).then(function (dbArticle) {
                    console.log("Data inputted into document");
                    searchDB(res)
                }).catch(function (err) {
                    console.log(err)
                    searchDB(res)
                });
            }
            finally {


            }
        })
    })

    function searchDB(res) {
        db.Articles.find({}).then((dbArticle) => {
            console.log(dbArticle)
            res.render("index", { status: "Scrape Complete...", dbArticle: dbArticle })
        })
    }

    app.get("/clear", (req, res) => {
        db.Articles.deleteMany({}, (err) => { if (err) console.log(err) })
        res.render("index", { status: "Articles Cleared..." })
    })

    app.post("/add", (req, res) => {
        console.log(req.body.id)
        db.Articles.findOneAndUpdate({ _id: req.body.id }, { saved: req.body.saved, hearturl: req.body.hearturl }, { new: true })
            .then((updatedArticle) => {
                res.json(updatedArticle)
            })
    })

    app.post("/heart", (req, res) => {
        console.log(req.body)
        db.Articles.findOneAndUpdate({ _id: req.body.id }, {hearturl: req.body.hearturl}, {new:true})
        .then((updatedArticle)=>{
            res.json(updatedArticle)
        })
    })

    app.get("/saved", (req, res) => {
        db.Articles.find({ saved: true }).then((savedArticle) => {
            res.render("index", { dbArticle: savedArticle, status: "Saved Articles Loaded" })
        })


    })

    app.get("*", (req, res) => {
        res.render("index")
    })

}