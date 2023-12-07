import { Box, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';


const Message = ({message}) => {
const {googleAuth} = useSelector((state) => state.Auth) 
    // const hours = new Date(message.createdAt).getHours()
    // const minutes = new Date(message.createdAt).getMinutes()

    const hours = new Date(message.createdAt).getHours()
    const minutes = new Date(message.createdAt).getMinutes()
 
    const doenloadMedia  = (e, originalImage)=>{
        e.preventDefault();
        try{
          fetch(originalImage)
          .then(res => res.blob())
          .then(blob=>{
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.style.display = "none"
            a.href = url;

            const duplicateName = originalImage.split("/").pop()
            a.download = "" + duplicateName + "";
document.body.append("a")
a.click();
window.URL.revokeObjectURL(url)
          }).catch(err => console.log("error while downloading",err)) 

        }catch(e){
          console.log("error while downloading",e);
        }
    }
  return (
    <>
    {
        googleAuth.sub === message?.senderId ?  <Box  sx={{background: "#dcf8c6", maxWidth:"60%",  marginLeft:"auto", width:"fit-content", padding:"5px", display:"flex", borderRadius:"5px", wordBreak:"break-word"}}>

{ 
  message.type === "file" ? <Box sx={{position:"relative"}}>
    {
      message?.text?.includes('.pdf')? <Box style={{display:"flex"}}> 
        <img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/27_Pdf_File_Type_Adobe_logo_logos-512.png" alt="" style={{width:80}}/>
        <Typography style={{fontSize:14}}>{message.text.split("/").pop()}</Typography>

      </Box> : <img src={message.text} height={"200"} width={"200"}/>
    }
    
    <Typography sx={{fontSize:"10px", color:"#919191", marginLeft:"auto", wordBreak:"keep-all", position:"absolute", bottom:0,right:0}}><GetAppRoundedIcon onClick={(e)=>{doenloadMedia(e, message.text)}} sx={{marginRight:"10px", border:"1px solid grey",'&:hover':{cursor: "pointer"}, borderRadius:"50%",}} fontSize='small'/>{`${hours < 10 ? "0" + hours : hours} : ${minutes < 10 ? "0" + minutes : minutes}`}</Typography>
  </Box> : <> <Typography sx={{fontSize:"14px", padding:"0 25px 0 5px"}}>{message.text}</Typography><Typography sx={{fontSize:"10px", color:"#919191", marginTop:"auto", wordBreak:"keep-all"}}>{`${hours < 10 ? "0" + hours : hours} : ${minutes < 10 ? "0" + minutes : minutes}`}</Typography></>
}

    </Box> : <Box sx={{background: "#ffffff", maxWidth:"60%", width:"fit-content", padding:"5px", display:"flex", borderRadius:"5px", wordBreak:"break-word"}}>
    { 
  message?.type === "file" ? <Box sx={{position:"relative"}}>
    {
      message?.text?.includes('.pdf')? <Box style={{display:"flex"}}> 
        <img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/27_Pdf_File_Type_Adobe_logo_logos-512.png" alt="" style={{width:80}}/>
        <Typography style={{fontSize:14}}>{message.text.split("/").pop()}</Typography>

      </Box> : <img src={message?.text} height={"200"} width={"200"}/>
    }
    
    <Typography sx={{fontSize:"10px", color:"#919191", marginLeft:"auto", wordBreak:"keep-all", position:"absolute", bottom:0,right:0}}><GetAppRoundedIcon onClick={(e)=>{doenloadMedia(e, message.text)}} sx={{marginRight:"0px", border:"1px solid grey",'&:hover':{cursor: "pointer"}, borderRadius:"50%",}} fontSize='small'/>{`${hours < 10 ? "0" + hours : hours} : ${minutes < 10 ? "0" + minutes : minutes}`}</Typography>
  </Box> : <> <Typography sx={{fontSize:"14px", padding:"0 25px 0 5px"}}>{message?.text}</Typography><Typography sx={{fontSize:"10px", color:"#919191", marginTop:"auto", wordBreak:"keep-all"}}>{`${hours < 10 ? "0" + hours : hours} : ${minutes < 10 ? "0" + minutes : minutes}`}</Typography></>
}
    </Box>
        
    }
    </>
   
  )
}

export default Message