const express = require('express')
const test = require("./model/connectSmartcontract");
const mongo = require("./model/mongodb");
const app = express()
const port = 3000
app.listen(3000);
app.set("views engine", "ejs");
app.set("views","./views");
app.use(express.static("public"));


app.get('/data', function(req, res){
  res.send(mongo.show()+"Data")
})

