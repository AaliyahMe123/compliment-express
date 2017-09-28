const express = require("express")
const app = express()
const bodyParser = require("body-parser")
var hbs = require("express-handlebars")
var mongoose = require("./db/connection")


var Compliment = mongoose.model("compliment")
var colors = ["red", "blue", "orange", "green"]


app.listen(3000, () =>{
  console.log("app listening on port 3000")
})
app.set("view engine", "hbs")
app.use("/assets", express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get("/:name", (req, res) => {
  rand = Math.floor(Math.random() * Compliment.length)
  color = colors[Math.floor(Math.random() * colors.length)]
  name = req.params.name
  compliments = Compliment.findOne().skip(rand).then(compliments => {
    res.render("show", {compliments, color, name})
  })
})

app.post("/", (req, res) => {
  Compliment.create(req.body.compliment).then(compliment => {
    res.redirect("/")
  })
})
