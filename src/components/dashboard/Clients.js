import React, { useState, useEffect, useRef} from 'react';
import bc from '../layout/Images/i1.png';
import { Link } from 'react-router-dom';
import "./Home.css";
import "./Clients.css";
import ClientDashboard from '../client_ui/clientDashboard';
import axios  from 'axios';

const Clients = () => {   
    const [ searchText, setSearchText ] = useState("");
    const [ searchedResult, setSearchedResult ] = useState([]);

    const [ isAdvanceFilterClicked, setIsAdvancedFilterClicked ] = useState(false);

    const [ emailFilterStatus, setEmailFilterStatus ] = useState(false)
    const [ firstNameStatus, setFirstNameFilterStatus ] = useState(false)
    const [ lastNameFilterStatus, setLastNameFilterStatus ] = useState(false)

    let access_token = sessionStorage.getItem('access_token');

    const myInput = useRef()

    let delay;

    const fetchClients = async()=> {
        console.log('call Api',searchText)
        let isAnyOfEmailFirstNameOrLastNameEmpty = true
        let params = {}
        if(emailFilterStatus){
            params['email'] = searchText;
            isAnyOfEmailFirstNameOrLastNameEmpty = false
        }
        if(firstNameStatus){
            params['first_name'] = searchText
            isAnyOfEmailFirstNameOrLastNameEmpty = false
        }
        if(lastNameFilterStatus){
            params['last_name'] = searchText
            isAnyOfEmailFirstNameOrLastNameEmpty = false
        }

        if(isAnyOfEmailFirstNameOrLastNameEmpty){
            params['name'] = searchText
        }
        // else{
        //     params['name'] = searchText
        // }
        console.log("paras", params)

        await axios.get("/councilor/client",{params: params, headers: {"Authorization" : `Bearer ${access_token}`} })
        .then(res => {
            if(res.status === 200){
                console.log("clientres",res)
                setSearchedResult(res.data)
            }
        })
        .catch(err => console.log("error in fetching clients"))
    
        // if(searchText){
        //     await axios.get("/councilor/client",{params: params, headers: {"Authorization" : `Bearer ${access_token}`} })
        //     .then(res => {
        //         if(res.status === 200){
        //             console.log("clientres",res)
        //             setSearchedResult(res.data)
        //         }
        //     })
        //     .catch(err => console.log("error in fetching clients"))
        // }
        // else{
        //     axios.get('/councilor/client', { headers: {"Authorization" : `Bearer ${access_token}`} })
        //     .then(res => {
        //         if(res.status === 200){
        //             setSearchedResult(res.data)
        //         }
        //     })
        // }
       
      }

      useEffect(() => {
        fetchClients()
      },[])

      useEffect(() => {
       if(searchText){
            delay = setTimeout(() => {
            if(searchText)fetchClients()
          }, 1000)
          return () => clearTimeout(delay)
       }
       else{
        fetchClients()
       }
   
      
     }, [searchText])
   
     const keyDown = (e)=>{
       if (e.key === "Enter") {
         clearTimeout(delay)
         fetchClients()
         console.log('keyDown press and ready for api call')
       }
     }

     const handleEmailChange = (e) => {
        console.log("AMICLICKED",e.target)
        setEmailFilterStatus(e.target.checked)
     }
console.log("firstNameStatus",firstNameStatus)
        return (
            <div className="container">
                <input type="checkbox"/>
                {/* <div id="navbar">
                    <div class="left-section">
                        <img src={bc} alt="pic" />
                    </div>
                    <div class="right-section">
                        <ul>
                            <li>
                                <Link to="/home">Home</Link>
                            </li>
                            <li>
                                <Link to="/clients">Clients</Link>
                            </li>
                            <li>
                                <Link to="/">Appointments</Link>
                            </li>
                            <li>
                                <Link to="/">Reminders</Link>
                            </li>
                            <li>
                                <Link to="/">Account</Link>
                            </li>
                        </ul>
                    </div>
                </div> */}
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
                                    ref={myInput}
                                    // value={emailFilterStatus} 
                                    onChange={handleEmailChange }
                                    checked={emailFilterStatus}
                                     />
                                <label htmlFor="email" className='filter-menu-input-label'> Email</label>
            
                                <input type="checkbox" 
                                    className='advance-filter-input' 
                                    id="firstName" 
                                    name="firstName" 
                                    value={firstNameStatus}
                                    checked={firstNameStatus}
                                    onChange={(e) =>  setFirstNameFilterStatus(e.target.checked)}
                                    />
                                <label htmlFor="firstName" className='filter-menu-input-label'> First Name</label>
            
                                <input type="checkbox" 
                                    className='advance-filter-input' 
                                    id="lastName" 
                                    name="lastName" 
                                    value={lastNameFilterStatus}
                                    checked={lastNameFilterStatus}
                                    onChange={(e) =>  setLastNameFilterStatus(e.target.checked)}
                                    />
                                <label htmlFor="lastName" className='filter-menu-input-label'> Last Name</label>
                            </div>
                        )}
                        
                    </div>

                    <div>
                        <div >
                            <Link to="/clientCreate">
                                <button className="create">+create</button>
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div>

                    <ClientDashboard searchedResult={searchedResult} 
                                     accessToken={access_token} 
                                     fetchClients={fetchClients} 
                                     />
                </div>
            </div>
        )
}

export default Clients;