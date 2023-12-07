import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { curUser, getConversationn, getallUsers, setConversationn } from '../../../Store/productSlice'
import { Box, Divider, Typography } from '@mui/material'
import { setActiveusers } from '../../../Store/AuthSlice'
import { io } from 'socket.io-client'

const Conversation = ({text}) => {
const [userss, setUserss] = useState([]);
let {users} = useSelector((state) => state.products)

const {googleAuth} = useSelector((state) => state.Auth) 
    const dispatch = useDispatch() 

    // useEffect(()=>{
    //     (userss.length === 0 ? users : userss).map((user)=>(
    //         user.sub !== googleAuth.sub && setuserSub(user.sub)))
    //     dispatch(getConversationn({senderID: googleAuth.sub, recieverID: userSub}))
    //     setMessage({text: conversation?.message, timestamp: conversation?.updatedAt})
    // }, [newMesgflag])
    // console.log(conversation);

    useEffect(()=>{
        dispatch(getallUsers())
    },[dispatch])

    useEffect(()=>{
        // dispatch(getallUsers())
        const filteredData = users.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
        // console.log(filteredData);
        // user.name.toLowerCase().includes(text.toLowerCase())
        setUserss(filteredData)
    }, [text])


  return (
    <>
    <Box sx={{height: "81vh", overflow: "overlay"}}>
        {
            (userss.length === 0 ? users : userss).map((user)=>(
                user.sub !== googleAuth.sub &&
               <>
                  <Box sx={{display:"flex", height:"45px", padding:"13px 0", cursor:"pointer"}} onClick={()=>{
                    dispatch(curUser(user));
                    dispatch(setConversationn({senderID: googleAuth.sub, recieverID: user.sub}))
                    
                  }}>
                    <Box>
                        <img src={user.picture} referrerpolicy="no-referrer" style={{width:50, height: 50, borderRadius:"50%", margin: "0 14px"}}/>
                    </Box>

                    <Box>
                        <Box>
                            <Typography style={{marginTop:13}}>{user.name}</Typography>
                            </Box>
                    </Box> 
                </Box>
                <Divider sx={{margin: "28px 0 0 60px", backgroundColor:"e9edef", opacity:"0.6"}}/>

                </>

            ))
        }

    </Box>
    </>
  )
}

export default Conversation