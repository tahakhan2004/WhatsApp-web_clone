const mongoose = require("mongoose");
// const autoIncrement = require("mongoose-auto-increment") 


const messageSchema = mongoose.Schema({
    senderId :{
        type: String,
    },
    reciverId :{
        type: String,
    },
    conversationid:{
        type: String,
    },
    type:{
        type: String,
    },
    text:{
        type: String,
    },
},
{
    timestamps: true
})

const messageModel = mongoose.model("Message" ,messageSchema);
module.exports = messageModel; 