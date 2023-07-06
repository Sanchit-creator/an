import { Box, Button, Input } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { verify } from '../service/api';
import styled from '@emotion/styled';



const signupInitialValues = {
    email: '',
    otp: ''
}

const Main = styled(Box)`
    height: 100vh;
`

const Verify = () => {
    const [signup, setSignup] = useState(signupInitialValues);
    const { params } = useParams();

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value, email: params});
        console.log(signup);
    }
    const navigate = useNavigate();
    const signupUser = async () => {
        try {
          let res = await verify(signup);
          if (res) {
            navigate('/')
          }
        } catch (error) {
          console.log(error);
        }
      }
      const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
        });
      };
  return (
    <>
        <Main component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            Enter Otp sent on your mail:
            <Input type='text' name='otp' onChange={(e) => onInputChange(e)}/>
            <Button onClick={() => signupUser()}>Submit</Button>
        </Main>
    </>
  )
}

export default Verify