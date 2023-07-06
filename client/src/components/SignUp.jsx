import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Checkbox, FormControlLabel, FormLabel, Grid, Input, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { signUp } from '../service/api';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const signupInitialValues = {
    firstName: '',
    lastName: '',
    dob: '',
    hobbies: '',
    projects: '',
    email:'',
    password:'',
    profilePicture:''
}



export default function SignUp() {
    const [signup, setSignup] = useState(signupInitialValues);

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value});
        if (e.target.name === 'profilePicture') {
          setSignup({ ...signup, profilePicture: e.target.files[0]});
        }
        console.log(signup);
    }

  const navigate = useNavigate()

  const signupUser = async () => {
    const data = new FormData();
    data.append('firstName', signup.firstName)
    data.append('lastName', signup.lastName)
    data.append('dob', signup.dob)
    data.append('hobbies', signup.hobbies)
    data.append('projects', signup.projects)
    data.append('email', signup.email)
    data.append('password', signup.password)
    data.append('profilePicture', signup.profilePicture)
    try {
      let res = await signUp(data);
      if (res) {
        navigate(`/verify/${res.data.email}`)
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
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                onChange={(e) => onInputChange(e)}
                required
                fullWidth
                id="name"
                label="FirstName"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                onChange={(e) => onInputChange(e)}
                id="phone"
                label="LastName"
                name="lastName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={(e) => onInputChange(e)}
                
                label="Date of birth"
                name="dob"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={(e) => onInputChange(e)}
                id="address"
                label="Hobbies"
                name="hobbies"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={(e) => onInputChange(e)}
                name="projects"
                label="Projects"
                type="text"
                id="userid"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={(e) => onInputChange(e)}
                name="email"
                label="Email"
                type="email"
                id="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={(e) => onInputChange(e)}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
            <Typography>Profile Photo</Typography>
                <Input 
                    type='file' 
                    fullWidth
                    name='profilePicture'
                    onChange={(e) => onInputChange(e)} 
                />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => signupUser()}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  </ThemeProvider>
  );
}