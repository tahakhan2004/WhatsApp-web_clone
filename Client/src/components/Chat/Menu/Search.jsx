import { Box, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'

const Search = ({setText}) => {
  return (
    <>
    <Box sx={{backgroundColor:"#fff", height:"45px" , borderBottom:"1px solid #F2F2F2", display:"flex", alignItems:"center"}}>
        <Box sx={{backgroundColor:"#f0f2f5", margin:"0px 13px", width:"100%", borderRadius:"10px"}}>
            <Box sx={{position:"absolute", height:"100%", padding:"3px 8px", color:"#919191"}}>
                <SearchIcon fontSize='small'/>
            </Box>
            <InputBase placeholder='Search or start a new chat' sx={{width:"100%", padding:"16px", height: "15px", paddingLeft: "65px"}} onChange={(e)=>{setText(e.target.value)}}/>
        </Box>
    </Box>
    </>
  )
}

export default Search