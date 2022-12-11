import React, { Component, useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Followup = ()=>{

    const navigate = useNavigate();

    const [ title, setTitle ] = useState("")
    const [ body, setBody ] = useState("")

    let access_token = sessionStorage.getItem('access_token');
    let refresh_token = sessionStorage.getItem('refresh_token');
    let councilor_id = sessionStorage.getItem('councilor_id');
    let client_id = sessionStorage.getItem('client_id');

    const onSubmit = e => {
        e.preventDefault();
    
    
    const newFollowup = {
          title: title,
          body: body,
          councilor_id: councilor_id
        };
        axios.post('/followup',newFollowup,{ headers: {"Authorization" : `Bearer ${access_token}`} })
        .then((res) => {
          // if Registration is successful then open the home page directly
          if (res.status === 201) {
            console.log(res)
            console.log("Followup Created!")
            let followup_id = res.data.id
            console.log(followup_id)

            const params = {
              followup_id: followup_id,
              client_id: client_id
            };

            axios.post(`/followup/${followup_id}/client/${client_id}`,{params},{ headers: {"Authorization" : `Bearer ${access_token}`} })
            .then((res) =>{
              if (res.status === 200){
                console.log("Followup linked to client")
                navigate("/appointments");
                
              }
            })
            .catch((e)=> {console.log('unable to link appointment to client')})
            
          }
        })
        .catch((e)=> {console.log('unable to add data from axios')})
    
        console.log(newFollowup);
    
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
                  onChange={(e)=> setTitle(e.target.value)}
                  value={title}
                //   error={errors.date}
                  id="date"
                  type="date"
                />
                <label htmlFor="date">Title</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={(e)=> setBody(e.target.value)}
                  value={body}
                //   error={errors.description}
                  id="description"
                  type="text"
                />
                <label htmlFor="description">Body</label>
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
                 +Followup
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>   
    )
}

export default Followup;