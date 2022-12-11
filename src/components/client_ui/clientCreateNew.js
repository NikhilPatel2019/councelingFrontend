import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
// import Box from '@mui/material/Box';
// import { Button } from "@mui/material";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Client = (props) =>{
  const navigate = useNavigate();
  const location = useLocation();

  let clientDetails = location.state
  console.log("createprops",location.state)

    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ title, setTitle ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ errors, setErrors ] = useState("");

    let access_token = sessionStorage.getItem('access_token');
    let refresh_token = sessionStorage.getItem('refresh_token');
    let councilor_id = sessionStorage.getItem('councilor_id');

    useEffect(() => {
      if(clientDetails){
        setFirstName(clientDetails.first_name)
        setLastName(clientDetails.last_name)
        setEmail(clientDetails.email);
        setTitle(clientDetails.title)
      }
    },[clientDetails])
    const onSubmit = e => {
        e.preventDefault();
    
    const newClient = {
          first_name: firstName,
          last_name: lastName,
          title: title,
          email: email,
          // councilor_id: this.state.councilor_id
        };
        // console.log(access_token)
        axios.post('/client',newClient,{ headers: {"Authorization" : `Bearer ${access_token}`} })
        .then((res) => {
          // if Registration is successful then open the home page directly
          if (res.status === 201) {
            console.log(res)
            let client_id = res.data.client_id
            console.log(client_id)

            const params = {
              councilor_id: councilor_id,
              client_id: client_id
            };

            axios.post(`/councilor/${councilor_id}/client/${client_id}`,{params},{ headers: {"Authorization" : `Bearer ${access_token}`} })
            .then((res) =>{
              if (res.status === 201){
                navigate("/clients");
              }
            })
            .catch((e)=> {console.log('unable to link councilor to client')})
            
          }
        })
        .catch((e)=> {console.log('unable to add data from axios')})
    
        console.log(newClient);
    
    };

    return (
      <>
      
           <Box
                        sx={{
                        p: 1,
                        m: 1,
                        mt: 15,
                        mb:0,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        }}
                    >
                     <Button variant="default" component={Link} to="/clients">
                        <i className="material-icons left">keyboard_backspace</i>
                        Back to home
                      </Button> 
            </Box>
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Create Client
                  </Typography>
                  <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      autoComplete="firstName"
                      autoFocus
                      onChange={(e)=> setFirstName(e.target.value)}
                      value={firstName}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="lastName"
                      label="Last Name"
                      type="lastName"
                      id="lastName"
                      autoComplete="lastName"
                      onChange={(e)=> setLastName(e.target.value)}
                      value={lastName}
                    />

                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="title"
                      label="Title"
                      type="title"
                      id="title"
                      autoComplete="title"
                      onChange={(e)=> setTitle(e.target.value)}
                      value={title}
                    />

                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="email"
                      label="Email"
                      type="email"
                      id="email"
                      autoComplete="email"
                      onChange={(e)=> setEmail(e.target.value)}
                      value={email}
                    />
              
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Create
                    </Button>
                   
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
        {/* <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            </div>
            <form noValidate onSubmit={onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={(e)=> setFirstName(e.target.value)}
                  value={firstName}
                //   error={errors.first_name}
                  id="first_name"
                  type="text"
                />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={(e)=> setLastName(e.target.value)}
                  value={lastName}
                //   error={errors.last_name}
                  id="last_name"
                  type="text"
                />
                <label htmlFor="last_name">Last Name</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={(e)=> setTitle(e.target.value)}
                  value={title}
                //   error={errors.title}
                  id="title"
                  type="text"
                />
                <label htmlFor="title">Title</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={(e)=> setEmail(e.target.value)}
                  value={email}
                //   error={errors.email}
                  id="email"
                  type="email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                 +Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
      </>
    )
}
export default Client;