// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb")

var obj = new ObjectID()
console.log(obj)

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if(err) return console.log("Unable to connect to Mongodb server")
    console.log("Connected to Mongodb server")
    const db = client.db("TodoApp")
    // db.collection("Todos").insertOne({
    //     text : "Something to do",
    //     completed: false
    // }, (err, result) =>{
    //     if(err){
    //         return console.log("Unable to inser todo", err)
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })

    // db.collection("Users").insertOne({
    //     name : "Jack",
    //     age : 20,
    //     location : "Queens"
    // }, (err, result) =>{
    //     if(err) return console.log("Unable to insert user", err)
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2))
    // })

    client.close();
})