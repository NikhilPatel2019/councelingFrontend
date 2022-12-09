import React, { useEffect, useState } from 'react';
import bc from '../layout/Images/i1.png';
import axios from 'axios'
import { Link } from 'react-router-dom';
import AppoinmentDashboard from '../appointment_ui/appoinmentDashboard';
import "./Home.css";
import "./Clients.css";

const Appointments = () => {
    const [ searchText, setSearchText ] = useState("");
    const [ searchedResult, setSearchedResult ] = useState([]);

    const [ isAdvanceFilterClicked, setIsAdvancedFilterClicked ] = useState(false);

    const [ emailFilterStatus, setEmailFilterStatus ] = useState(false)
    const [ startDate, setStartDate ] = useState(false)
    const [ endDate, setEndDate ] = useState(false) 
    const [ date, setDate ] = useState(false) 
    const [ description, setDescription ] = useState(false) 

    let access_token = sessionStorage.getItem('access_token');

    let delay;

    const fetchAppoinments = async()=> {
      console.log('call Api',searchText)
      let isAnyOfEmailFirstNameOrLastNameEmpty = true
      let params = {}
      if(emailFilterStatus){
          params['email'] = searchText;
          isAnyOfEmailFirstNameOrLastNameEmpty = false
      }
      if(startDate){
        params['start_date'] = searchText;
        isAnyOfEmailFirstNameOrLastNameEmpty = false
      }
      if(endDate){
        params['end_date'] = searchText;
        isAnyOfEmailFirstNameOrLastNameEmpty = false
      }
      if(date){
        params['date'] = searchText;
        isAnyOfEmailFirstNameOrLastNameEmpty = false
      }

      if(isAnyOfEmailFirstNameOrLastNameEmpty){
        params['appointment_includes'] = searchText;
      }

      await axios.get("/appoinment",{ params: params,headers: {"Authorization" : `Bearer ${access_token}`} })
        .then(res => {
            if(res.status === 200){
                console.log("res",res)
                setSearchedResult(res.data)
            }
        })
        .catch(err => console.log("error in fetching clients"))
    }

      useEffect(() => {
        fetchAppoinments()
      },[])
    
      useEffect(() => {
        if(searchText){
            delay = setTimeout(() => {
                if(searchText)fetchAppoinments()
              }, 1000)
          
              return () => clearTimeout(delay)
        }
        else{
            fetchAppoinments()
        }
         
      }, [searchText])
    
      const keyDown = (e)=>{
        if (e.key === "Enter") {
          clearTimeout(delay)
          fetchAppoinments()
          console.log('keyDown press and ready for api call')
        }
      }

    return (
        <div className="container">
          
          <div className='dashboard-menus-main'>
                    <div>
                        <p className='counciler-counciler'>Counciler:</p>
                         <div className='counclier-static-left'>
                            <img src="/download-icon.svg" height={20} width={20} className="counciler-static-arror-icon" />
                            <button className='counciler-static-btn'>YOU</button>
                         </div>
                        
                    </div>

                    <div className='menubar-searchbar-main'>
                        <input type="text" placeholder=' Search Name, Email, First Name, Last Name'
                            value={searchText} onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={keyDown} className="search-bar-input"
                        />
                        <p onClick={() => setIsAdvancedFilterClicked(!isAdvanceFilterClicked)}
                           className={isAdvanceFilterClicked ? "advance-filter-active" : "advance-filter"}
                        >
                            Advance Filters
                        </p>
                        {isAdvanceFilterClicked && (
                            <div className='advance-filer-main'>
                                <input type="checkbox" 
                                    className='advance-filter-input' 
                                    id="email" 
                                    name="email"
                                    value={emailFilterStatus} 
                                    onChange={(e) =>  setEmailFilterStatus(e.target.checked) } />
                                <label for="email" className='filter-menu-input-label'> Email</label>
            
                                <input type="checkbox" 
                                    className='advance-filter-input' 
                                    id="firstName" 
                                    name="firstName" 
                                    value={startDate}
                                    onChange={(e) =>  setStartDate(e.target.checked)}
                                    />
                                <label for="firstName" className='filter-menu-input-label'> Start Date</label>
            
                                <input type="checkbox" 
                                    className='advance-filter-input' 
                                    id="endDate" 
                                    name="endDate" 
                                    value={endDate}
                                    onChange={(e) =>  setEndDate(e.target.checked)}
                                    />
                                <label for="endDate" className='filter-menu-input-label'> End Date</label>

                                <input type="checkbox" 
                                    className='advance-filter-input' 
                                    id="date" 
                                    name="date" 
                                    value={date}
                                    onChange={(e) =>  setDate(e.target.checked)}
                                    />
                                <label for="date" className='filter-menu-input-label'> Date</label>

                                <input type="checkbox" 
                                    className='advance-filter-input' 
                                    id="description" 
                                    name="description" 
                                    value={description}
                                    onChange={(e) =>  setDescription(e.target.checked)}
                                    />
                                <label for="description" className='filter-menu-input-label'>Description</label>

                            </div>
                        )}
                        
                    </div>

                    <div>
                        <div >
                            <Link to="/appointmentCreate">
                                <button className="create">+Appointment</button>
                            </Link>
                        </div>
                    </div>
                </div>

            <div>
            
            <AppoinmentDashboard searchedResult={searchedResult}/>
            </div>
        </div>
    )
}

export default Appointments;