var express=require("express");
var router=express();
router.get("/", function (req, res) {
    
        // db.customer.findAll({}).then((customer) => {
            res.render("index",{ hello:"hello"});
            
        // })
   
    
});
module.exports = router;