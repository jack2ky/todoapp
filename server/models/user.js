const mongoose = require("mongoose")
const validator = require("validator");
const jwt =require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

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
    }],
    tom : String
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

userSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;
    try{
        decoded = jwt.verify(token, "abc123");
    }catch(e){
        // return new Promise((resolve, reject) =>{
        //     reject()
        // })
        return Promise.reject()
    }

    return User.findOne({
        "_id" : decoded._id,
        "tokens.token" : token,
        "tokens.access" : "auth"
    })
}

userSchema.pre("save", function(next) {
    const user = this;
    if(user.isModified("password")){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next()
            })
        })
    }else{
        next()
    }
})

const User = mongoose.model("User", userSchema )

module.exports = {User}