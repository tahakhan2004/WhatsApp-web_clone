const { default: mongoose } = require("mongoose");
const Conversation = require("../Models/ConversationSchema");
const messageModel = require("../Models/Message");
const userModel = require("../Models/userSchema");
const  grid  = require("gridfs-stream");

let gfs, gridFsBucket;
const conn = mongoose.connection;
conn.once("open", ()=>{
    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db,{
      bucketName: "photos"
    })
    gfs = grid(conn.db,mongoose.mongo)
    gfs.collection("photos")
})




const authController = {

addUser : async (req, res)=>{    
  try{
   let exist = await userModel.findOne({sub: req.body.sub});

   if(exist){
    res.status(200).json({msg: "user already exist"})
    return
   }
   
   // const newUser = new userModel(req.body)
        const newUser = new userModel({
            ...req.body,
            contacts: [] // You can initialize it with an empty array
        });   
   await newUser.save()
   res.status(200).json(newUser)

  }catch(err){
    return res.status(500).json(err)
  }
},

getUsers : async (req, res)=>{    
  try{
   const users = await userModel.find({})
   return res.status(200).json(users)

  }catch(err){
    return res.status(500).json(err)
  }
},

newConversation: async (req,res)=>{
try{
  const senderid = req.body.senderID;
  const reciverid = req.body.recieverID; 

  const exist  = await Conversation.findOne({members: {$all: [senderid, reciverid]}})

  if(exist){
    return res.status(200).json("conversation already exist")
  }

  const newConversation = await new Conversation({
    members: [senderid , reciverid]
  }).save();
  return res.status(200).json("conversation saved successfully")

}catch(err){
  return res.status(500).json(err)
}
},

getConversaion: async (req,res)=>{
  try{
    const conversation  = await Conversation.findOne({members: {$all: [req.body.senderID, req.body.recieverID]}})
    return res.status(200).json(conversation)
  }catch(err){
    return res.status(500).json(err)
  }
},

newMessage : async (req, res)=>{    
  try{
   const newMsg = await new messageModel(req.body).save()
   await Conversation.findByIdAndUpdate(req.body.conversationid ,{message: req.body.text})
   res.status(200).json("new message has sent successfullt")

  }catch(err){
    return res.status(500).json(err)
  }
},

getMessage : async (req, res)=>{    
  // console.log(req.params.id);
  try{
   const messages = await messageModel.find({conversationid: req.params.id})
   res.status(200).json(messages)

  }catch(err){
    return res.status(500).json(err)
  }
},

uploadFile : async (req, res)=>{    
  const url = "https://extinct-wasp-buckle.cyclic.app"
  if (!req.file){
    res.status(500).json("file not found")
  }

  // console.log(req.file);
  const imageURL = `${url}/api/file/blog-${req.file.originalname}`
  return res.status(200).json(imageURL)
},

getFiles : async (req, res)=>{    
  try{
   const file = await gfs.files.findOne({filename: req.params.filename})
   const readStream = gridFsBucket.openDownloadStream(file._id)
   readStream.pipe(res)
  //  console.log("hi");
  }catch(err){
    return res.status(500).json(err)
  }
},

updateContacts: async (req, res) => {
    const { userId } = req.params;
    const { contacts } = req.body;

    try {
        const user = await userModel.findOne({sub: userId});


        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        user.contacts = contacts;
        await user.save();

        res.status(200).json(user);

    } catch (err) {
        return res.status(500).json(err);
    }
},


    
}
module.exports = authController
