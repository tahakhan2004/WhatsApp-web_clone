const express = require("express");
const cors = require("cors")
require("dotenv").config() 

const mongoose = require("mongoose");
const poster = require("./Models/ConversationSchema");
const routerr = require("./router/router");
// const middlewares = require("./Middleware");
const app = express()
const PORT = process.env.PORT || 8000;

const BASE_URI = process.env.MONGO_URI

mongoose.connect(BASE_URI)
.then(res => console.log("mongodb connect"))
.catch(err => console.log(err, "error")) 
app.use(express.json({ limit: '50mb' })); // Set payload size limit for JSON
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors())

app.use("/api", routerr)

app.listen(PORT, ()=> console.log(`Server is running on port: ${PORT}`))

