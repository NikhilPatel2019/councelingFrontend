import React, { Component, useState } from "react";
// import { Link } from "react-router-dom";
import bc from "./Images/i1.png"; 
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Login = () => {

    const navigate = useNavigate();

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ errors, setErrors ] = useState("");
    
    const onSubmit = e => {
        console.log("in submit")
        e.preventDefault();
        const userData = {
              email: email,
              password: password
            };
        axios.post('/login',userData)
        .then((res) => {
          console.log(res)
          // if Registration is successful then open the home page directly
          if (res.status === 200) {
            sessionStorage.setItem("councilor_id",res.data.user.id);
            sessionStorage.setItem("access_token", res.data.access_token);
            sessionStorage.setItem("refresh_token", res.data.refresh_token);
            console.log(res)
            navigate("/home");
          }else{
            console.log("wrong page")
          }
        })
        .catch((e)=> {console.log('unable to add data from axios')})
    
        console.log(userData);
      };

    return (
        <>

                <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Login in
                    </Typography>
                    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Register"}
                        </Link>
                        </Grid>
                    </Grid>
                    </Box>
                </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default Login;