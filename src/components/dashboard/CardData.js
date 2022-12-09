import React, { Component } from 'react';
import "./CardData.css";

const ClientName = [
    {
        name: "Adarin Sayatin"
    },
    {
        name: "James Goodall"
    },
    {
        name: "Donovan Stemson"
    }
]

const appointment = [
    {
        name: "David Helson",
        day: "Wednesday",
        date: "November 21st",
        time: "4 days ago"
    },
    {
        name: "Thera Goodwood",
        day: "Tuesday",
        date: "November 20th",
        time: "5 days ago"
    },
    {
        name: "Timmy John",
        day: "Thursday",
        date: "November 22st",
        time: "3 days ago"
    }
]

class CardData extends Component {
    render() {
        const clients = ClientName.map(client => {
            return (
                <h6 className="client_name">{client.name}</h6>
            );
        })

        const appointmentData = appointment.map(data => {
            return (
                <div className="client_data">
                    <p className="name">{data.name}</p>
                    <div>
                        <p className="day">{data.day},</p>
                        <p className="date">{data.date}</p>
                    </div>
                    <p className="time">{data.time}</p>
                </div>
            );
        })
        return (
            <div className="wrapper">
                <div className="client_name">
                    <h5>Clients you usually interact with on Wednesdays...</h5>
                    <div className="client_column">
                        {clients}
                    </div>
                    <div className="footer_section">See more...</div>
                </div>

                <div className="client_details">
                    <h5>Appointments you had 3-5 days ago...</h5>
                    <div className="client_column">
                        {appointmentData}
                    </div>
                    <div className="footer_section">See more...</div>
                </div>
            </div>
        );
    }
}

export default CardData;