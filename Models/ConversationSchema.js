const mongoose = require("mongoose");
// const autoIncrement = require("mongoose-auto-increment") 
const ConversationSchema = mongoose.Schema({
    members : {
        type: Array
    },
    message : {
        type: String
    }},
{
    timestamps: true
}
)

// autoIncrement.initialize(mongoose.connection)
// postSchema.plugin(autoIncrement.plugin, "post")

const Conversation = mongoose.model("conversation", ConversationSchema)
module.exports = Conversation