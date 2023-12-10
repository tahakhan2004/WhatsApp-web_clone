const express = require("express");
// const { addUser } = require("../Controller/controller.js");
const authController = require("../Controller/controller");
const upload = require("../Middleware/upload");

const routerr = express.Router()
// const middlewares = require("../Middleware");


routerr.post("/add", authController.addUser)
routerr.get("/users", authController.getUsers)
routerr.post("/setconversation", authController.newConversation)
routerr.post("/getconversation", authController.getConversaion)
routerr.post("/newmessage", authController.newMessage)
routerr.get("/getmessage/:id", authController.getMessage)

routerr.post("/uploadfile", upload.single("file") ,authController.uploadFile)
routerr.get("/file/:filename",authController.getFiles)
routerr.get("/updatecontact/:userId",authController.updateContacts)




module.exports = routerr
