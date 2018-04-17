const mongoose = require("mongoose")
const validator = require("validator");
const jwt =require("jsonwebtoken");
const _ = require("lodash");

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        trim: true,
        type: String,
        minlength: 2,
        unique: true,
        validate: {
            // validator : validator.isEmail
            validator: (value) => {
                return validator.isEmail(value)
            },
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ["_id", "email"])
}

userSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = "auth";
    var token = jwt.sign({_id : user._id.toHexString(), access}, "abc123").toString();
    console.log("token : " , token)
    user.tokens = user.tokens.concat([{access, token}])
    return user.save()
        .then(() =>{
            return token
        })
}

const User = mongoose.model("User", userSchema )

module.exports = {User}