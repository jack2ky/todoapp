const {MongoClient , ObjectID}  = require("mongodb")

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) =>{
    if(err) return console.log("unable to connect to MongoDb server");
    console.log("Connected to MongoDb server");
    const db = client.db("TodoApp")

    // db.collection("Todos").find(
    //     { 
    //         _id: new ObjectID("5ab6e6085ec3e14a08e524a6")
    // }).toArray()
    //     .then((docs) =>{
    //         console.log("Todos");
    //         console.log(JSON.stringify(docs, undefined, 2))
    //     })

    db.collection("Todos")
        .find()
        .count()
        .then((count) =>{
            console.log(`Todos count: ${count}`)
        }, (err) =>{
            console.log(err)
        })
            


    client.close()
})