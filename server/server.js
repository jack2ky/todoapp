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
        // console.log(e)
        res.status(400).send(e)
        
    })
})

app.get("/todos", (req, res) =>{
    Todo.find().then((todos) =>{
        res.send({todos})
    }, e =>{
        res.status(400).send(e)
    })
})

app.get("/todos/:id", (req, res)=>{
    var id = req.params.id
    var isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) return res.status(404).send("Id is not valid !")
    else{
        Todo.findById(id)
            .then(result =>{
                if(!result){ return res.status(400).send({message : "No ID found"})}
                else{res.send(result)}
            })
            .catch(e => console.log(e))
    }
})

app.listen(3000, () =>{
    console.log("listening on port 3000")
})

module.exports = {app}