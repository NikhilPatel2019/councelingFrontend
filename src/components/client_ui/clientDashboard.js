import React, { useEffect, useState } from 'react';
import '../style/clientDashboard.css';
import '../dashboard/CardData.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const ClientDashboard = (props) => {
    const navigate = useNavigate();

    const handleDelete = async (e,clientId) => {
        e.preventDefault();

        await axios.delete(`/client/${clientId}`, {headers: {"Authorization" : `Bearer ${props.accessToken}`}})
            .then(res => {
                if(res.status === 200){
                    console.log("clientdelteres",res)
                    props.fetchClients()
                }
            })
            .catch(err => console.log("error in deleting client"))
    }
    return(   
        <>
            
            {props.searchedResult.map(client => {
                console.log("check",client)
                return(
                    <div className='main-card'>
                <div>
                    <h1> {client.title}</h1>
                </div>

                <div className='client-dashboard-buttons'>
                        <button className='client-btn' onClick={() => navigate('/clientCreate', {state: client})}>
                            Update
                        </button>

                    <button className='client-btn' onClick={(e) => handleDelete(e,client.id)}>
                        Delete
                    </button>
                </div>
            </div>
                )
            })}
                {/* <div>

                    <div className="client_details">
                        <h5>Appointments you had 3-5 days ago...</h5>
                        <div className="client_column">
                            <div className="client_data">
                                <p className="name">name check</p>
                                <div>
                                    <p className="day">name day,</p>
                                    <p className="date">name date</p>
                                </div>
                                <p className="time">date time</p>
                            </div>
                        </div>
                        <div className="footer_section">See more...</div>
                    </div>
                </div> */}
        </>
    )
}

export default ClientDashboard;