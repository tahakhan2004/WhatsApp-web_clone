import { Box, Dialog } from '@mui/material'
import React from 'react'
import MenuChat from './Menu/MenuChat'
import EmptyChat from './EmptyChat'
import ChatBox from './ChatBox'
import { useSelector } from 'react-redux'

const ChatDialog = () => {
const {clickedUser} = useSelector((state) => state.products)
  
  return (
    <>
    <Dialog hideBackdrop={true} PaperProps={{sx:{height:"96%", width:"100%", maxWidth:"100%", maxHeight:"100%", boxShadow:"none",overflow:"hidden", margin:"20px", borderRadius: 0}}} open={true} maxWidth={"md"}>

    <Box sx={{display:"flex"}}>
        <Box sx={{minWidth:"450px"}}>
            <MenuChat/>
        </Box>

        <Box sx={{width: "73%", minWidth: "300px", height:"100%", borderLeft: "1px solid #00000024"}}>
          {
            Object.keys(clickedUser).length ? <ChatBox/> : <EmptyChat/>
          }
            
        </Box>
    </Box>
    </Dialog>
    </>
  )
}

export default ChatDialog