const express = require("express")
const path = require("path")

var app = express()

app.set("port", process.env.PORT || 3000)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use("/", require("./Routes/web"))
app.use(express.static(path.join(__dirname,"Resources")))
app.listen(app.get("port"), () => {
    console.log("Server started at port "+app.get("port")+".")
})