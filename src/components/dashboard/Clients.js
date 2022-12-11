import React, { useState, useEffect, useRef} from 'react';
import bc from '../layout/Images/i1.png';
import { Link } from 'react-router-dom';
import "./Home.css";
import "./Clients.css";
import ClientDashboard from '../client_ui/clientDashboard';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios  from 'axios';
import { Typography } from '@mui/material';

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
        window.scroll(0,0)
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
            <Box>
                    <Box
                        sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        p: 1,
                        m: 1,
                        mt: 20,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        }}
                    >
                        <div>
                            <p className='counciler-counciler'>Counciler:</p>
                            <div className='counclier-static-left'>
                                <img src="/download-icon.svg" height={20} width={20} className="counciler-static-arror-icon" />
                                <button className='counciler-static-btn'>YOU</button>
                            </div>
                        </div>
                        
                        <Box sx={{width: '75ch',     marginTop: "35px"}}>
                            <TextField id="outlined-basic" 
                                    label="Search" 
                                    variant="outlined"
                                    placeholder='Search Name, Email, First Name, Last Name'
                                    value={searchText} 
                                    onChange={(e) => setSearchText(e.target.value)}
                                    onKeyDown={keyDown} className="search-bar-input"
                                    sx={{width: 500}}
                                   
                                        />
                            <p onClick={() => setIsAdvancedFilterClicked(!isAdvanceFilterClicked)}
                            className={isAdvanceFilterClicked ? "advance-filter-active" : "advance-filter"}
                            >
                                Advance Filters
                            </p>
                            
                            {isAdvanceFilterClicked && (
                                <div className='advance-filer-main'>
                                    
                                    <Checkbox type="checkbox" 
                                        id="email" 
                                        name="email"
                                        onChange={handleEmailChange }
                                        checked={emailFilterStatus}
                                        color="default"
                                        />
                                    <label htmlFor="email" className='filter-menu-input-label'> Email</label>
                
                                    <Checkbox type="checkbox" 
                                        id="firstName" 
                                        name="firstName" 
                                        value={firstNameStatus}
                                        checked={firstNameStatus}
                                        color="default"
                                        onChange={(e) =>  setFirstNameFilterStatus(e.target.checked)}
                                        />
                                    <label htmlFor="firstName" className='filter-menu-input-label'> First Name</label>
                
                                    <Checkbox type="checkbox" 
                                        id="lastName" 
                                        name="lastName" 
                                        value={lastNameFilterStatus}
                                        checked={lastNameFilterStatus}
                                        color="default"
                                        onChange={(e) =>  setLastNameFilterStatus(e.target.checked)}
                                        />
                                    <label htmlFor="lastName" className='filter-menu-input-label'> Last Name</label>
                                </div>
                            )}
                        
                        </Box>
                        
                        <div style={{margin: "30px"}}>
                                <Button variant="contained"
                                        component={Link} 
                                        to="/clientCreate">+create</Button>
                        </div>

                    </Box>

                    
                    <ClientDashboard searchedResult={searchedResult} 
                                     accessToken={access_token} 
                                     fetchClients={fetchClients} 
                                     />
            </Box>
        )
}

export default Clients;