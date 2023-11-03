const express = require("express")
var { companies } = require("../../Resources/pages.json")

var router = express.Router()

router.get("/", function(req,res){
    console.log("Just starting router.")
    res.render("index", {})
})

router.get("/home", function(req,res){
    res.render("index", {})
}) 

router.get("/about", function(req,res){
    res.render("_pages/about", {})
}) 

companies.forEach(company => {
    let input = company.name.split(" ")[0].toLowerCase()
    router.get(`/${input}`,function(req,res){
        res.render(`_pages/${input}`, {})
    })
});

module.exports = router