import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Navigate } from "react-router-dom";

class Client extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      title:"",
      email: "",
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

const newClient = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      title: this.state.title,
      email: this.state.email,
      // councilor_id: this.state.councilor_id
    };
    console.log(this.state.access_token)
    axios.post('/client',newClient,{ headers: {"Authorization" : `Bearer ${this.state.access_token}`} })
    .then((res) => {
      // if Registration is successful then open the home page directly
      if (res.status === 201) {
        console.log(res.status)
        // window.open('/clientCreate', "_self")
        // {<Navigate to="/clientCreate" replace={true} />}
      }
    })
    .catch((e)=> {console.log('unable to add data from axios')})

    console.log(newClient);

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
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              {/* <h4>
                <b>Register</b> below
              </h4> */}
              {/* <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p> */}
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.first_name}
                  error={errors.first_name}
                  id="first_name"
                  type="text"
                />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.last_name}
                  error={errors.last_name}
                  id="last_name"
                  type="text"
                />
                <label htmlFor="last_name">Last Name</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.title}
                  error={errors.title}
                  id="title"
                  type="text"
                />
                <label htmlFor="title">Title</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
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
      </div>
    );
  }
}
export default Client;