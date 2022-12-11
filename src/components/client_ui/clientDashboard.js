import React, { useEffect, useState } from 'react';
import '../style/clientDashboard.css';
import '../dashboard/CardData.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Card, Snackbar } from '@mui/material';


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
                return(
                    <Card variant="outlined" className='main-card' sx={{background: "#F3EFE0"}} >
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
                    </Card>
                )
            })}
             
        </>
    )
}

export default ClientDashboard;