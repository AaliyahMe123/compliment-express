var mongoose = require("./connection.js")
var seedData = require("./seeds.json")

var Compliment = mongoose.model("Compliment")

Compliment.remove({}).then(() => {
  Compliment.collection.insert(seedData).then(() => {
    process.exit()
  })
})
