const {SHA256} = require("crypto-js");

const jwt = require("jsonwebtoken")

var data = {
    id : 10
}

var token = jwt.sign(data, "123abc");
console.log(token)

var decoded = jwt.verify(token, "123abc");
console.log("decoded", decoded);
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