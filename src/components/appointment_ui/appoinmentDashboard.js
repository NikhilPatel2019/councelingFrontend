import React from 'react';
import '../style/clientDashboard.css'

const AppoinmentDashboard = (props) => {

        
    return(
        <>

            {props.searchedResult.map(appoinemnt => {
                            console.log("check",appoinemnt)
                            return(
                                <div className='main-card'>
                            <div>
                                <h1> {appoinemnt.description}</h1>
                            </div>

                            <div className='client-dashboard-buttons'>
                                    <button className='client-btn'>
                                        Create Feedback
                                    </button>
                            </div>
                        </div>
                            )
                        })}
        </>
    )
}

export default AppoinmentDashboard;