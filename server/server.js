var express = require("express");
var bodyparser = require("body-parser");

const {mongoose} = require("./db/mongoose")
var {Todo} = require("./models/todo");
var {User} = require("./models/user");

var app  = express();

app.use(bodyparser.json());

app.post("/todos", (req, res) => {
    var todo = new Todo({
        text : req.body.text
    }).save()
    .then((doc) =>{
        res.send(doc)
    })
    .catch(e => {
        console.log(e)
        res.status(400).send(e)
        
    })
})

app.listen(3000, () =>{
    console.log("listening on port 3000")
})