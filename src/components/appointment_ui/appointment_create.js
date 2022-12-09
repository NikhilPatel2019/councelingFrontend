import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

class Appointment extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      description: "",
      note:"",
      feedback: "",
      access_token: "",
      refresh_token: "",
      councilor_id: "",
      errors: {}
    };
  }
  componentDidMount(){
    let access_token = sessionStorage.getItem('access_token');
    let refresh_token = sessionStorage.getItem('refresh_token');
    let councilor_id = sessionStorage.getItem('councilor_id');
    this.setState({access_token:access_token, refresh_token:refresh_token, councilor_id:councilor_id})
  }

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();


const newAppointment = {
      date: this.state.date,
      description: this.state.description,
      note: this.state.note,
      feedback: this.state.feedback,
      councilor_id: this.state.councilor_id
    };
    console.log(this.state.access_token)
    axios.post('/appointment',newAppointment,{ headers: {"Authorization" : `Bearer ${this.state.access_token}`} })
    .then((res) => {
      if (res.status === 201) {
        console.log(res.status)
        window.open('/appointmentCreate', "_self")
      }
    })
    .catch((e)=> {console.log('unable to add data from axios')})

    console.log(newAppointment);

  };



render() {
    const { errors } = this.state;
return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.date}
                  error={errors.date}
                  id="date"
                  type="date"
                />
                <label htmlFor="date">Date</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.description}
                  error={errors.description}
                  id="description"
                  type="text"
                />
                <label htmlFor="description">Description</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.note}
                  error={errors.note}
                  id="note"
                  type="text"
                />
                <label htmlFor="note">Note</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.feedback}
                  error={errors.feedback}
                  id="feedback"
                  type="text"
                />
                <label htmlFor="feedback">Feedback</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "200px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                 +Appointment
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    );
  }
}
export default Appointment;