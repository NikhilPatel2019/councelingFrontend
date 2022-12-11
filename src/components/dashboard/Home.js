import React, { Component } from 'react';
import bc from '../layout/Images/i1.png';
import { Link } from 'react-router-dom';
import "./Home.css";
import CardData from '../dashboard/CardData';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


class Home extends Component {
    render() {
        return (
            <Box component="main" sx={{ p: 5, mt:3 }}>
                    <Toolbar />
                    <Typography>
                        <h1>Welcome back,</h1>
                        <h1>Erik!</h1>
                        <CardData />
                    </Typography>
                </Box> 
        )
    }
}

export default Home;