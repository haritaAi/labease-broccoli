import React ,{useEffect,useContext}from 'react';
import {Link} from 'react-router-dom'
import Menu from '../components/menu'
import '../css/home.css'

import CompanyContext from '../context/CompanyContext'

import ClientContext from '../context/ClientContext';


function Home() {

    
    const {setClientSelected,setRedirect} = useContext(ClientContext)
    const {currentCompany,setCurrentCompany} = useContext(CompanyContext) 
    const companies = ["Evoq Digital Dental Solutions","Evoq Dental Studio","Evoq Digital Dental Solutionss"]
     
useEffect(()=>{
  setClientSelected(null)
  setRedirect(false)
},[])
  
    

    return (
               
                <div className = ''>
                   <Menu />                  
                   <div className="">

                       <div className=" d-flex  flex-wrap   ">
                      { companies.map((company,index) =>  
                            <div className=" border border-secondary ">
                            <div className="d-flex flex-column flex-sm-row  company-container  company-background"
                                onClick = {()=> console.log(`Hi , this is ${company}`)}
                                >
                                <div className="co-12 col-md-4 p-1">
                                        <h1 className = "company-heading">{company}</h1>
                                      <div  >
                                        <Link  className = 'btn btn-info fs-4 my-1' 
                                               to = '/client/newClient'
                                               style = {{width : 120}}
                                               onClick = {()=> setCurrentCompany(index)}
                                                                ><div>New Client</div></Link> 
                                      </div>
                                      <div >
                                        <Link  className = 'btn btn-info fs-4 my-1' style = {{width : 120}} to = '/order/neworder' ><div>New Order</div></Link> 
                                      </div>
                                      <div>
                                        <Link  className = 'btn btn-info fs-4 my-1' style = {{width : 120}} to = '/payment' ><div>New Payment</div></Link> 
                                      </div>
                                    </div>     
                                    {/* <div className="col-12 col-md-8 border border-dark rounded text-center" >
                                        <h1> summary</h1> 
                                    </div> */}

                            </div>

                            </div>
                          )}
  
                           </div>
                   </div>
                
                </div>
              
              
    );
}

export default Home;