import React, { Component, useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Appointment = ()=>{

    const navigate = useNavigate();

    const [ date, setDate ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ note, setNote ] = useState("")
    const [ feedback, setFeedback ] = useState("")

    let access_token = sessionStorage.getItem('access_token');
    let refresh_token = sessionStorage.getItem('refresh_token');
    let councilor_id = sessionStorage.getItem('councilor_id');

    const onSubmit = e => {
        e.preventDefault();
    
    
    const newAppointment = {
          date: date,
          description: description,
          note: note,
          feedback: feedback,
          councilor_id: councilor_id
        };
        axios.post('/appointment',newAppointment,{ headers: {"Authorization" : `Bearer ${access_token}`} })
        .then((res) => {
          if (res.status === 201) {
            console.log(res.status)
            navigate("/appointments");
          }
        })
        .catch((e)=> {console.log('unable to add data from axios')})
    
        console.log(newAppointment);
    
      };

      
    return(
        <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <form noValidate onSubmit={onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={(e)=> setDate(e.target.value)}
                  value={date}
                //   error={errors.date}
                  id="date"
                  type="date"
                />
                <label htmlFor="date">Date</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={(e)=> setDescription(e.target.value)}
                  value={description}
                //   error={errors.description}
                  id="description"
                  type="text"
                />
                <label htmlFor="description">Description</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={(e)=> setNote(e.target.value)}
                  value={note}
                //   error={errors.note}
                  id="note"
                  type="text"
                />
                <label htmlFor="note">Note</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={(e)=> setNote(e.target.value)}
                  value={feedback}
                //   error={errors.feedback}
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
    )
}

export default Appointment;