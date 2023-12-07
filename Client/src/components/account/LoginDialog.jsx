import { Box, Dialog, List, ListItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'
import { checkAuth } from '../../Store/AuthSlice';
import { useDispatch } from 'react-redux'
import { createUser } from '../../Store/productSlice';
const LoginDialog = () => {
    const dispatch = useDispatch()
    const onloginSuccesss = (res)=>{
       const decoded= jwt_decode(res.credential);
        dispatch(checkAuth(decoded));
        dispatch(createUser(decoded));
    }

    const onloginError = (res)=>{
        console.log(res);    
    }
 
    // useEffect (()=>{
    //     dispatch(startSocket())
    // },[])
  return (
    <>
    <Dialog hideBackdrop={true} PaperProps={{sx:{height:"96%", marginTop:30, width:"60%", maxWidth:"100%", maxHeight:"100%", boxShadow:"none",overflow:"hidden"}}} open={true}>
        <Box sx={{display:"flex", justifyContent:"space-evenly"}}>
            <Box sx={{padding:"50px 0 50px 0"}}>
                <Typography sx={{fontSize:"26px", fontWeight:"300", color:"#525252", fontFamily:"inherit", marginBottom:"30px"}}>Use WhatsApp on your computer</Typography>
                <List sx={{padding: 0, marginTop: "15px" ,fontSize:"18px", lineHeight:"28px", color:"#4a4a4a"}}>
                    <ListItem>1. Open WhatsApp on your phone</ListItem>
                    <ListItem>2. Tap Menu or Settings and select Linked Devices</ListItem>
                    <ListItem>3. Tap on <strong> Link a device</strong> </ListItem>
                    <ListItem>4. Point your phone to this screen to capture the QR code</ListItem>

                </List>
            </Box>
            <Box>
                <img src='https://www.ginifab.com/feeds/qr_code/img/qrcode.jpg' alt='QR code' style={{height:235, width:235, marginTop:"50px"}}/>
                <Box>
                    <GoogleLogin onSuccess={onloginSuccesss} onError={onloginError}/>
                </Box>
            </Box>
        </Box>
    </Dialog>
    </>
  )
}

export default LoginDialog