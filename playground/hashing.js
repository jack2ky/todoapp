const {SHA256} = require("crypto-js");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const password = "123abc";

bcrypt.genSalt(10, (err, salt) =>{
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash)
    })
})

var hashedPassword = "$2a$10$7pMMYcEcobW5su8fTr5YJeE6K3Zk1VSucMftcpi6vDAeVz9qAkDD2";

bcrypt.compare(password, hashedPassword, (err, result) =>{
    console.log("result",result);
})

// var data = {
//     id : 10
// }

// var token = jwt.sign(data, "123abc");
// console.log(token)

// var decoded = jwt.verify(token, "123abc");
// console.log("decoded", decoded);



// var message = "I am number 3";
// var hash = SHA256(message).toString()

// console.log(`Message: ${message}`);
// console.log(`HASH: ${hash}`)
// console.log(typeof hash)

// var data = {
//     id : 4
// }
// var token ={
//     data,
//     hash : SHA256(JSON.stringify(data) + "somesecret").toString()
//     // hash : SHA256(JSON.stringify)
// }
// console.log(token)
// token.data.id = 4;
// // token.hash = SHA256(JSON.stringify(token.data) + "somesecret").toString()

// var resultHash = SHA256(JSON.stringify(token.data) + "somesecret").toString();
// if(resultHash === token.hash){
//     console.log("Data was not change")
// }else{
//     console.log("Data was changed. Do not trust!")
// }