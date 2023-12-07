import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

const EmptyChat = () => {
  return (
   <>
    <Box sx={{backgroundColor:"#F8F9Fa", padding:"30px 0", textAlign:"center", height:"100vh"}}>
      <Box sx={{padding:"0 180px"}}>
        <img src="https://i.gadgets360cdn.com/large/whatsapp_multi_device_support_update_image_1636207150180.jpg" alt="" style={{width:200, marginTop:100}}/>
        <Typography sx={{fontSize:"32px", margin:"25px 0 10px 0", fontFamily:"inherit", fontWeight:300, color:"#41525d"}}>WhatsApp Web</Typography>
  
        <Typography sx={{fontSize:"14px", color:"#667781", fontWeight:400, fontFamily:"inherit"}}> Now send and recieve messages without keeping your phone online</Typography>

        <Typography sx={{fontSize:"14px", color:"#667781", fontWeight:400, fontFamily:"inherit"}}>Use WhatsApp on up to 4 linked devices and 1 phone at the same time</Typography>

        <Divider sx={{margin:"40px 0", opacity:"0.4"}}/>
      </Box>
    </Box>
   </>
  )
}

export default EmptyChat