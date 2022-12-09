import React, { Component } from "react";
import { Link } from "react-router-dom";
import bc from './Images/i1.png';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
                <div id="navbar">
                    <div class="left-section">
                        <Link to='/'>
                            <img src={bc} alt="pic" />
                        </Link>
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
                </div>
      </div>
    );
  }
}
export default Navbar;