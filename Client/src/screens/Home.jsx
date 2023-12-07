import { Box, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import LoginDialog from '../components/account/LoginDialog'
import ChatDialog from '../components/Chat/ChatDialog';
import { useSelector } from 'react-redux'
const Home = () => {

  const {googleAuth} = useSelector((state) => state.Auth)
  // const Auth = localStorage.getItem("auth")
  // console.log(googleAuth);
  return (
    <>


    {
    
     googleAuth ? <Box sx={{backgroundColor:"#DCDCDC", height:"100vh"}}>
    <AppBar sx={{height: "125px", boxShadow:"none", backgroundColor:"#00A884"}}>
      <Toolbar>

      </Toolbar>
    </AppBar>
    <ChatDialog />
    </Box> : <Box sx={{backgroundColor:"#DCDCDC", height:"100vh"}}>
    <AppBar sx={{height: "220px", boxShadow:"none", backgroundColor:"#00bfa5"}}>
      <Toolbar>

      </Toolbar>
    </AppBar>
    <LoginDialog />
    </Box>
    }
    </>
 
   

   
  )
}

export default Home
