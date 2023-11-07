const express = require("express")
var { companies } = require("../../Resources/pages.json")
const path = require("path")
const fs = require('fs')

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
    let ispres=1
    try {
        fs.readFileSync(path.join(__dirname,`../../views/_pages/${input}.ejs`))
    } catch(err) {
        ispres=0
    }
    if(!ispres) {
        console.log(`${input}.ejs not found...Creating one\n`)
        let data = `<%- include ("../_partials/_header.ejs") -%>
        <style>
            #${input} {
                color: rgb(0, 254, 155);
            }
            #${input}:hover {
                color: #21ffc4;
            }
            #profiles .row .col {
                padding-top: 50px;
                width: 50%;
                text-align: center;
                border: solid;
                border-width: 2pt;
                background-color: rgba(0, 254, 155,0.5);
            }
            #profiles .row .col img {
                border: solid;
                border-color: black;
                border-width: 2pt;
                display: block;
                margin-left: auto;
                margin-right: auto;
                width: 45%;
            }
            #profcon:hover {
                padding-right: 20px;
                transform: scale(1.1);
            }
            #profcon:hover .imgcon {
                padding-right: 10px;
                transform: scale(1.25);
            }
            #profcon:hover .imgcon img {
                box-shadow: 8px 5px 1px rgb(243, 243, 243);
            }
        </style>
        <br>
        <br>
        <div><h2 style="font-weight: bold;text-align: center;">${company.name}</h2></div>
        <br>
        <div><p>${company.description}</p></div>
        <br>
        <div id="profiles">
        <div class='container'>`
        let index, len
        if(company.employees.length%2==0) len=company.employees.length
        else len=company.employees.length-1
        for (index = 0; index < len; index++) {
            let employee = company.employees[index];
            if(index%2==0) data+="<div class='row'><div class='col-1'></div>"
            data+= `<div class='col' id='profcon'><div class='imgcon'><img src='/${input}_${index}.jpg' alt='${employee.name}'></div><br><h5>${employee.name}</h5><p>${employee.post}</p></div><div class='col-1'></div>`
            if(index%2!=0) data+="<div class='col-1'></div></div><br><br>"
        }
        if(company.employees.length%2!=0) data+=`<div class='row'><div class='col-4'></div><div class='col' id='profcon'><div class='imgcon'><img src='/${input}_${index}.jpg' alt='${company.employees[index].name}'></div><br><h5>${company.employees[index].name}</h5><p>${company.employees[index].post}</p></div><div class='col-4'></div></div>`
        data+=`</div>
        </div>
        <script>
            let obj = document.getElementById('cl')
            obj.className += " active"
            obj.style.color = "rgb(0, 254, 155)"
        </script>
        <%- include ("../_partials/_footer.ejs") -%>`
        let file = fs.createWriteStream(path.join(__dirname,`../../views/_pages/${input}.ejs`))
        file.write(data)
        file.end()
        console.log(`${input}.ejs is created...\n`)
    }
    router.get(`/${input}`,function(req,res){
        res.render(`_pages/${input}`, {})
    })
});

module.exports = router