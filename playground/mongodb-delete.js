const  {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) =>{
    db = client.db("TodoApp")
    if (err) return console.log("Unable to connect to MongoDb server")
    console.log("Connected to MongoDB server")

    // db.collection("Todos").deleteMany({text: "Eat Lunch"})
    //     .then((result) =>{
    //         console.log(result)
    //     })

    // db.collection("Todos").deleteOne({text: "Eat lunch"})
    //     .then(result => console.log(result));

    // db.collection("Todos").findOneAndDelete({completed : false})
    //     .then(result => console.log(result))

    db.collection("Users").deleteMany({name : "Jack"})
        .then(result => console.log(result))


    db.close()
})