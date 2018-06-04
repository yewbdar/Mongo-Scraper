var express = require("express");
var router = express();

var cheerio = require("cheerio");
var request = require("request");
var db = require("../models");

router.get("/", function (req, res) {
    var results = [];
    var id = 0;
    request("https://www.nytimes.com/", function (error, response, html) {
        var $ = cheerio.load(html);

        $("article.theme-summary").each(function (i, element) {


            if ($(element).children(".story-heading").text() !== "" && $(element).children(".summary").text() !== "" && $(element).children(".story-heading").children().attr("href") !== "") {
                db.Article.find({ title: $(element).children(".story-heading").text().trim() }, function (err, response) {
                    if (err) {
                        throw err;
                    } else {
                        if (response.length <= 0) {
                            results.push({
                                id: id,
                                title: $(element).children(".story-heading").text().trim(),
                                summary: $(element).children(".summary").text(),
                                link: $(element).children(".story-heading").children().attr("href")
                            });
                            id++;
                        }

                    }
                })
            }
        });

        // console.log("...",results[0])
        res.render("index", { data: results })

    });
    router.get("/saved", function (req, res) {
        db.Article.find({}, function (err, response) {
            if (err) {
                throw err;
            } else {
                res.render("savedarticles", { data: response })

                // res.json(response); 

            }
        })

        console.log("...  am here")

    });
    router.post("/addarticles", function (req, res) {

        db.Article.create(req.body)
            //.then(function(dbNote) {
            //     //      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
            //     //   })
            .then(function (dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                // res.json(dbArticle);
                 res.redirect('/');
            })
        //       .catch(function(err) {
        //         // If an error occurred, send it to the client
        //         res.json(err);
        //       });
        
    });
   
});
module.exports = router;