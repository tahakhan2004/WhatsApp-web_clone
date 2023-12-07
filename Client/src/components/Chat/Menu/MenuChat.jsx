import { Box } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Header from './Header'
import Search from './Search'
import Conversation from './Conversation'
// import { io } from 'socket.io-client'

const MenuChat = () => {
  const [text, setText] = useState("")

  return (
    <>
      <Box>
        <Header />
        <Search setText={setText}/>
        <Conversation text={text}/>
      </Box>
    </>
  )
}

export default MenuChat