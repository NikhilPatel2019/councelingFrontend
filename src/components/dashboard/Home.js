import React, { Component } from 'react';
import bc from '../layout/Images/i1.png';
import { Link } from 'react-router-dom';
import "./Home.css";
import CardData from '../dashboard/CardData';

class Home extends Component {
    render() {
        return (
            <div className="container">
                {/* <div id="navbar">
                    <div class="left-section">
                        <img src={bc} alt="pic" />
                    </div>
                    <div class="right-section">
                        <ul>
                            <li>
                                <Link to="/home">Home</Link>
                            </li>
                            <li>
                                <Link to="/clients">Clients</Link>
                            </li>
                            <li>
                                <Link to="/appointments">Appointments</Link>
                            </li>
                            <li>
                                <Link to="/">Reminders</Link>
                            </li>
                            <li>
                                <Link to="/">Account</Link>
                            </li>
                        </ul>
                    </div>
                </div> */}

                <div className="section">
                    <h1>Welcome back,</h1>
                    <h1>Erik!</h1>
                </div>
                <CardData />
            </div>
        )
    }
}

export default Home;