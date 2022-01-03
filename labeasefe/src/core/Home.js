import React ,{useEffect,useState,useContext}from 'react';
import {Link} from 'react-router-dom'
import Menu from '../components/menu'
import '../css/home.css'
import { isAuthenticated ,signout} from '../auth';
import Button from '../components/Button'
import Client from './Client';
import MainMenu from './MainMenu'
import GenerateSummery from '../components/home/GenrateSummery'
import logo  from '../images/logo-white.png'
import CompanyContext from '../context/CompanyContext'

import ClientContext from '../context/ClientContext';

function Home() {

    const {user,token} = isAuthenticated()
    const {clients,fetchClients,setClientSelected,setRedirect} = useContext(ClientContext)
    const [orders,setOrders]= useState([])
     const {currentCompany,setCurrentCompany} = useContext(CompanyContext) 

     
useEffect(()=>{
  setClientSelected(null)
  setRedirect(false)
},[])
  
    console.log("Clients REceived in home :",clients)

    return (
               
                <div className = ''>
                   <Menu />                  
                   <div className="">

                       <div className=" d-flex  flex-wrap   ">
                           
                            <div className=" border border-secondary ">
                                    <div className="d-flex flex-column flex-sm-row  company-container  company-background"
                                        onClick = {()=> console.log("Hi , this is company 1")}
                                        >
                                        <div className="col">
                                                <h3> Company-1</h3>
                                              <div  >
                                                <Link  className = 'btn btn-info fs-4 my-1' 
                                                       to = '/client/newClient'
                                                       onClick = {()=> setCurrentCompany(1)}
                                                                        ><div>New Client</div></Link> 
                                              </div>
                                              <div>
                                                <Link  className = 'btn btn-info fs-4 my-1' to = '/order/neworder' ><div>New Order</div></Link> 
                                              </div>
                                              <div>
                                                <Link  className = 'btn btn-info fs-4 my-1' to = '/payment' ><div>New Payment</div></Link> 
                                              </div>
                                            </div>     
                                            <div className="col">
                                                <h1> summary</h1> 
                                            </div>

                                    </div>

                                    </div>
                                <div className=" border border-secondary">

                                    <div className="d-flex flex-column flex-sm-row company-container company-background"
                                         onClick = {()=> console.log("Hi , this is company 2")}
                                        >
                                        <div className="col">
                                            <h3>  Company-2</h3>
                                               <div >
                                                <Link  className = 'btn btn-info fs-4 my-1' 
                                                       to = '/client/newClient' 
                                                       onClick = {()=> setCurrentCompany(2)}
                                                                       ><div>New Client</div></Link> 
                                               </div>
                                               <div>
                                                <Link  className = 'btn btn-info fs-4 my-1' to = '/order/neworder' ><div>New Order</div></Link> 
                                               </div>
                                               <div>
                                                <Link  className = 'btn btn-info fs-4 my-1' to = '/payment' ><div>New Payment</div></Link> 
                                              </div>
                                            </div>     
                                            <div className="col">
                                                <h1>summary</h1> 
                                            </div>
                                    </div>
                              </div>

                              <div className=" border border-secondary">

                                    <div className="d-flex flex-column flex-sm-row company-container company-background"
                                          onClick = {()=> console.log("Hi , this is company 3")}
                                       >
                                        <div className="col">
                                            <h3>  Company-3</h3>
                                              <div  >
                                                <Link  className = 'btn btn-info fs-4 my-1' 
                                                       to = '/client/newClient'
                                                       onClick = {()=> setCurrentCompany(3)}
                                                       ><div>New Client</div></Link> 
                                              </div>
                                              <div>
                                                <Link  className = 'btn btn-info fs-4 my-1' to = '/order/neworder' ><div>New Order</div></Link> 
                                              </div>
                                              <div>
                                                <Link  className = 'btn btn-info fs-4 my-1' to = '/payment' ><div>New Payment</div></Link> 
                                              </div>
                                            </div>     
                                            <div className="col">
                                                <h1>summary</h1> 
                                            </div>
                                    </div>
                               </div>




                         </div>
                   </div>
                
                </div>
              
              
    );
}

export default Home;