import { Box, Drawer, Typography } from '@mui/material'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';


const InfoDrawer = ({open, setopen}) => {
const {googleAuth} = useSelector((state) => state.Auth)

    const handleClose = ()=>{
        setopen(false)
    }
  return (
    <>
<Drawer
open={open}
onClose={handleClose}
PaperProps={{sx:{left: 20, top: 14, height: "95%", width: "32.8%", boxShadow:"none"}}}
style={{zIndex:1500}}
>
<Box sx={{backgroundColor:"#008069", height:"107px", color:"#FFFFFF" , display:"flex", padding:"15px"}}>
<ArrowBackIcon onClick={()=>{setopen(false)}} style={{marginTop:"auto", fontWeight:"600"}}/>
<Typography sx={{marginTop:"auto", fontWeight:"600", marginLeft:"20px", fontSize:"18px"}}>Profile</Typography>
</Box>

<Box sx={{backgroundColor: "#ededed", height:"85%"}}>

<Box sx={{display:"flex", justifyContent:"center"}}>
  <img src={googleAuth.picture} referrerpolicy="no-referrer" style={{width:190, borderRadius:"50%", padding:"15px 0"}}/>
</Box>

<Box sx={{backgroundColor:"#FFFFFF", padding: "12px 30px 2px", boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
  <Typography sx={{fontSize:"13px",color:"#009688", fontWeight:200}}>Your name</Typography>
  <Typography sx={{margin:"14px 0", color:"#4A4A4A"}}>{googleAuth.name}</Typography>
</Box>

<Box sx={{padding:"15px 20px 28px 30px"}}>
  <Typography sx={{fontSize:"13px" , color:"#8696a0"}}>This is not your username or pin. This name will be visible to your whatsapp contacts. </Typography>
</Box>

<Box sx={{backgroundColor:"#FFFFFF", padding: "12px 30px 2px", boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
  <Typography sx={{fontSize:"13px",color:"#009688", fontWeight:200}}>About</Typography>
  <Typography sx={{margin:"14px 0", color:"#4A4A4A"}}>Eat! Sleep! Code! Repeat!</Typography>
</Box>

</Box>
</Drawer>
    </>
  )
}

export default InfoDrawer