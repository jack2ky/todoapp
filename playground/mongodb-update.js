const {MongoClient, ObjectID} = require("mongodb")

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) =>{
    if(err) return console.log("Unable to connect to the DB");
    db = client.db("TodoApp")
    console.log("connected to mongodb server");

    // db.collection("Todos").findOneAndUpdate({
    //     _id: new ObjectID("5ab6f0bc5ec3e14a08e524ab")
    // },{
    //     $set: {
    //         completed : true
    //     }
    // },{
    //     returnOriginal : false
    // })
    // .then(result => console.log(result))
    // .catch(err =>console.log(err))
    db.collection("Users").findOneAndUpdate(
        {
        name : "Jack"
    },{
        $inc: { age: 1 },
        $set:{name: "Jill"}
        
    },{
        returnOriginal : false
    })
    .then(result => console.log(result))
    .catch(err => console.log(err))

    db.close()

})