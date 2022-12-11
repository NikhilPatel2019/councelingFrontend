import React, { Component } from 'react';
import bc from '../layout/Images/i1.png';
import { Link } from 'react-router-dom';
import FollowupDashboard from '../followup_ui/followupDashboard'
import "./Home.css";
import "./Followup.css";

class Followup extends Component {
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
                                <Link to="/Clients">Clients</Link>
                            </li>
                            <li>
                                <Link to="/">Appointments</Link>
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
                <div className="search">
                <input type="text" placeholder='  search followup...'/>
                </div>
                <div>
                
                <FollowupDashboard />
                </div>
            </div>
        )
    }
}

export default Followup;