import { Box, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import MessageIcon from '@mui/icons-material/Message';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoDrawer from '../../Drawer/infoDrawer';

const Header = () => {
  const [open, setopen] = useState(null)
  const [openDrawer, setopenDrawer] = useState(false)
const {googleAuth} = useSelector((state) => state.Auth)
// console.log(googleAuth);

const handleClose = ()=>{
  setopen(null)
}

const handleClick = (e)=>{
  setopen(e.currentTarget)
}

const toggleDrawer = ()=>{
  setopenDrawer(true)
}
  return (
   <>
   <Box sx={{height:"50px", backgroundColor:"#ededed", padding: "8x 16px" ,display:"flex", alignItems:"center"}}> 
    <img referrerpolicy="no-referrer" style={{height: 55, width: 55, borderRadius:"50%", padding:"10px"}} src={googleAuth.picture} onClick={toggleDrawer}/>
   <Box sx={{marginLeft: "auto"}} >
    <MessageIcon sx={{marginRight:"20px", padding:"1px", color:"#000", fontSize:"22px", marginTop:"2px"}}/>
    <MoreVertIcon sx={{marginRight:"20px", padding:"1px", color:"#000"}}
    onClick={handleClick}
    />
    <Menu
        anchorEl={open}
        keepMounted
        open={open}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={()=>{handleClose(); toggleDrawer()}} sx={{fontSize: "14px", padding: "15px 60px 5px 24px", color: "#4A4A4A"}}>Profile</MenuItem>
      </Menu>
   </Box>
   </Box>

   <InfoDrawer open={openDrawer} setopen={setopenDrawer}/>
   </>
  )
}

export default Header