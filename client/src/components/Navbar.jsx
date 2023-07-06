import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

const Tool = styled(Toolbar)`
    display: flex;
    justify-content: space-between;
`


const Navbar = () => {
  const userInfo = localStorage.getItem("userInfo");
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Tool>
          <h2>User Portfolio Website</h2>
          { userInfo && <Button color="inherit"
                onClick={() => {
                    localStorage.clear();
                    navigate('/')
                }}
            >Logout</Button>}
        </Tool>
      </AppBar>
    </Box>
  )
}

export default Navbar