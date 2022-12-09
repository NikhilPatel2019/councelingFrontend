import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import bc from "./Images/i1.png"; 
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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
             <div className="container">
                <div style={{ marginTop: "4rem" }} className="row">
                {/* <img src ={bc} alt = "pic"/> */}
                <div className="col s8 offset-s2">
                    <Link to="/" className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i>
                    Back to
                    home
                    </Link>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <h4>
                        <b>Login</b> below
                    </h4>
                    <p className="grey-text text-darken-1">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                    </div>
                    <form noValidate onSubmit={onSubmit}>
                    <div className="input-field col s12">
                        <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        // error={errors.email}
                        id="email"
                        type="email"
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s12">
                        <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        // error={errors.password}
                        id="password"
                        type="password"
                        />
                        <label htmlFor="password">Password</label>
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
                        Login
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </>
    )
}

export default Login;