var express = require("express");
var router = express();

var cheerio = require("cheerio");
var request = require("request");
var db = require("../models");

router.get("/", function (req, res) {
    var results = [];

    request("https://www.nytimes.com/", function (error, response, html) {
        var $ = cheerio.load(html);

        $("article.theme-summary").each(function (i, element) {


            if ($(element).children(".story-heading").text() !== "" && $(element).children(".summary").text() !== "" && $(element).children(".story-heading").children().attr("href") !== "") {
                db.Article.find({ story_id: $(element).attr("data-story-id") }, function (err, response) {
                    if (err) {
                        throw err;
                    } else {
                        if (response.length <= 0) {
                            results.push({
                                story_id: $(element).attr("data-story-id"),
                                title: $(element).children(".story-heading").text().trim(),
                                summary: $(element).children(".summary").text(),
                                link: $(element).children(".story-heading").children().attr("href")
                            });

                        }

                    }
                    // console.log(" **********loade data first ****************", results)

                })

            }
            // res.render("index", { data: results });
        });
        setTimeout(() => {
            console.log(" **********loade data second ****************", results)
            res.render("index", { data: results });
        }, 100);

        
    });


});
router.get("/saved", function (req, res) {
    db.Article.find({}, function (err, response) {
        if (err) {
            throw err;
        } else {
            res.render("savedarticles", { data: response })
            console.log(" ************from db**************" + response)
        }
    })

});
router.post("/addarticles", function (req, res) {
    db.Article.create(req.body)
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
})
router.post("/rmvarticles/:id", function (req, res) {
    db.Article.deleteOne({ _id: req.params.id })
        .then(function (dbArticle) {
            res.json(dbArticle);
        });
});
router.get("/note/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        // ..and populate all of the notes associated with it
        .populate("note")
        .then(function (dbArticle) {
            // If we were able to successfully find an Article with the given id, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });

});
router.post("/addnote/:id", function (req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated  -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function (dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});
router.post("/removenote/:id", function (req, res) {
    db.Note.deleteOne({ _id: req.params.id })
        .then(function (dbArticle) {
            res.json(dbArticle);
        });
})
module.exports = router;