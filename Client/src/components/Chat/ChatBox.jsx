import { Box, InputBase, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./message.css"
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import MicIcon from '@mui/icons-material/Mic';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { getConversationn, getallMessages, newMessage, setMessages, uploadFile } from '../../Store/productSlice';
import Message from './Message';
import axios from "axios"
import { io } from 'socket.io-client';
import { getMessages } from '../../Services(api\'s)/api';


const ChatBox = () => {
  const {googleAuth} = useSelector((state) => state.Auth) 
const {clickedUser, conversation} = useSelector((state) => state.products)
const [text, setText] = useState("");
const [messages, setMessages] = useState([]);
const [newMesgflag, setnewMesgflag] = useState(false)
const [file, setFile] = useState();
const [image, setImage] = useState("")
const [incomingmesg, setincomingmesg] = useState(null)

const dispatch = useDispatch();
const socket = useRef();

useEffect(() => {
  // socket.current = io('ws://military-glistening-shield.glitch.me/',{
  //   extraHeaders:{
  //     "user-agent": "Chrome"
  //   }
  // });

socket.current = io('wss://military-glistening-shield.glitch.me/',{
  headers:{
    "user-agent": "Mozilla"
  }
});

  // Cleanup on component unmount
  // return () => {
  //   socket.current.disconnect();
  // };
}, []);

const [activeusers, setActiveusers] = useState([])    
useEffect(()=>{
    socket.current.emit("addUsers", googleAuth)
    socket.current.on("getUsers", users=>{
        // dispatch(setActiveusers(users))
        setActiveusers(users)
    })
}, [googleAuth])
// console.log(activeusers);
// useEffect(() => {
//   console.log('Before:', incomingmesg);

//   socket.current.on('getMessage', data => {
//     console.log('Received data:', data);
//     setincomingmesg({
//               ...data,
//               createdAt: Date.now(),
//             });
// })
// console.log(incomingmesg);

// }, [incomingmesg]);
useEffect(()=>{
  // conversation._id &&  dispatch(getallMessages(conversation))
  const getMessageDetails = async () => {
    let data = await getMessages(conversation?._id);
    setMessages(data);
}
conversation?._id && getMessageDetails();
}, [conversation?._id,clickedUser?.id, newMesgflag])


// useEffect(() => {
//   // Event listener for incoming messages
//   if (socket.current) { // Check if socketRef.current is truthy
//     socket.current.on('getMessage', (data) => {
//       setincomingmesg({
//         ...data,
//         createdAt: Date.now(),
//       });
//     });
//   }
// }, [socket.current]);
// console.log(incomingmesg);
useEffect(()=>{
  incomingmesg && conversation?.members?.includes(incomingmesg?.senderId) && setMessages((prev) =>[...prev, incomingmesg]);
  // console.log("++",conversation?.members?.includes(incomingmesg?.senderId));
},[incomingmesg, conversation])

useEffect(()=>{
  dispatch(getConversationn({senderID: googleAuth.sub, recieverID: clickedUser.sub}))
}, [clickedUser?.sub])
// console.log(conversation._id);



const sendText =async (e)=>{
  const code = e.which;
  if(code === 13){
    let message ={}
    if(!file){

       message = {
        senderId: googleAuth.sub,
        reciverId: clickedUser.sub,
        conversationid: conversation._id,
        type: "text",
        text: text,
      }
    }else{
      message = {
        senderId: googleAuth.sub,
        reciverId: clickedUser.sub,
        conversationid: conversation._id,
        type: "file",
        text: image,
      }
    }
    socket.current.emit("sendMessage",message)
  // console.log(message);
      // dispatch(newMessage(message))
     await axios.post("https://extinct-wasp-buckle.cyclic.app/api/newmessage", message)
      .then((res)=>{
        console.log(res.data);
      }).catch((err)=>{
        console.log(err);
      })
      setText("")
      setFile("")
      setImage("")
      setnewMesgflag(prev => !prev)
  }
}

const sendmsg = async()=>{
  try {
    let message = {};
    if (!file) {
      message = {
        senderId: googleAuth.sub,
        reciverId: clickedUser.sub,
        conversationid: conversation._id,
        type: "text",
        text: text,
      };
    } else {
      message = {
        senderId: googleAuth.sub,
        reciverId: clickedUser.sub,
        conversationid: conversation._id,
        type: "file",
        text: image,
      };

    
    }
    socket.current.emit("sendMessage", message);

    // console.log(message);
    await axios.post("https://extinct-wasp-buckle.cyclic.app/api/newmessage", message)
    .then((res)=>{
      console.log(res.data);
    }).catch((err)=>{
      console.log(err);
    })
    setText("");
    setFile("");
    setImage("");
    setnewMesgflag((prev) => !prev)
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
useEffect(()=>{
    if(file){
      
      let data = new FormData();
      data.append("name", file.name)
      data.append("file", file);
      axios.post("https://extinct-wasp-buckle.cyclic.app/api/uploadfile", data)
      .then((res)=>{
        setImage(res.data)
      }).catch((err)=>{
        console.log(err);
      })
      

    } 
}, [file, dispatch])

useEffect(() => {
  // socket.current = io('ws://localhost:9000');
  // if(socket.current){

    socket.current.on('getmessage', data => {
    console.log('Received data: ', data);
      setincomingmesg({
                ...data,
                createdAt: Date.now(),
      });
  })
  // console.log(incomingmesg);

  // }
}, [incomingmesg])
const fileChange = (e)=>{
  setFile(e.target.files[0])
  setText(e.target.files[0].name)
}

  return (
    <>
    <Box>
        {/* header */}
        <Box sx={{height:"50px", backgroundColor:"#ededed", padding:"15px 22px", display:"flex", alignItems:"center"}}>
            <img src={clickedUser.picture} referrerpolicy="no-referrer" alt="" style={{height:35, width:35, objectFit:"cover", borderRadius:"50%"}}/>
            <Box>
                <Typography marginLeft={1.5}>{clickedUser.name}</Typography>
                <Typography marginLeft={1.5} fontSize={"12px"} color={"rgba(0,0,0,0.6)"}>{activeusers?.find(user=> user.sub===clickedUser.sub)? "Online" : "Offline"}</Typography>
            </Box>
            <Box sx={{marginLeft:"auto",}}>
                <SearchIcon sx={{ fontSize:"24px", marginRight:"8px"}}/>
                <MoreVertIcon sx={{ fontSize:"24px", marginRight:"8px"}}/>
            </Box>
        </Box>

        {/* Messages  */}
        <Box className='messagetopbox'>
            <Box sx={{height:"80vh", overflowY:"scroll"}}>
              {
                messages && messages.map((message)=>{
                  return <Box sx={{padding:"1px 50px"}}> <Message message={message}/></Box>
                })
              }
            </Box>

            <Box sx={{height:"55px" , background:"#ededed", display:"flex", alignItems:"center", width:"100%", padding:"0 15px"}}>
                <EmojiEmotionsOutlinedIcon sx={{margin:"5px", color:"#919191"}}/>
                <label htmlFor='fileinput'>
                <AttachFileOutlinedIcon sx={{margin:"5px", color:"#919191", transform:"rotate(40deg)",'&:hover':{cursor: "pointer"}}}/>
                </label>

              <input onChange={(e)=>{fileChange(e)}} type="file" id='fileinput' style={{display:"none"}}/>

                <Box sx={{background:"#ffffff", borderRadius:"18px", width:"calc(97% - 100px)"}}>
                  <InputBase placeholder='type a message' sx={{width:"100%", padding:"20px", height:"20px", paddingLeft:"25px", fontSize:"14px"}} value={text} onChange={(e)=>{setText(e.target.value)}} onKeyPress={(e)=> sendText(e)}/>
                </Box>
              
                <SendRoundedIcon sx={{margin:"5px", color:"green", '&:hover':{cursor: "pointer"} }} onClick={sendmsg}/>
       
                
            </Box>
        </Box>    
   </Box>
    </>
    
  )
}

export default ChatBox

