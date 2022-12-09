import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
// import Login from "./components/auth/Login";
import Login from "./components/auth/LoginNew";
import Home from './components/dashboard/Home';
import Clients from './components/dashboard/Clients';
import Followup from './components/dashboard/Followup';
// import ClientCreate from './components/client_ui/clientCreate';
import ClientCreate from './components/client_ui/clientCreateNew';
import Appointments from './components/dashboard/appointments';
import AppointmentCreate from './components/appointment_ui/appointmentCreate';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />

            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/clients" element={<Clients />} />
              <Route exact path="/followup" element={<Followup />} />
              <Route exact path="/clientCreate" element={<ClientCreate />} />
              <Route exact path="/appointments" element={<Appointments />} />
              <Route exact path="/appointmentCreate" element={<AppointmentCreate />} />
            </Routes>

        </div>
      </Router>
    );
  }
}
export default App;