const mongoose = require("mongoose");
// const autoIncrement = require("mongoose-auto-increment") 


const Schema = mongoose.Schema({
    iss :{
        type: String,
     
    },
    nbf :{
        type: Number,
    },
    aud:{
        type: String,
    },
    sub:{
        type: String,
        required: true,
    },
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    email:{
        type: String,
    },
    email_verified:{
        type: Boolean,
    },
    azp:{
        type: String,
    },
    name:{
        type: String,
        required: true,
    },
    picture:{
        type: String,
        required: true,
    },
    given_name:{
        type: String,
    },
    family_name:{
        type: String,
    },
    iat:{
        type: Number,
    },
    exp:{
        type: Number,
    },
    jti:{
        type: String,
    }
})

const userModel = mongoose.model("User" ,Schema);
module.exports = userModel; 
