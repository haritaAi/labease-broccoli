import React from 'react';
import {Link} from 'react-router-dom'
import PrintButton from '../PrintButton'
import EmailButton from '../EmailButton';


const ClientSummary = ({clientSelected}) => {

   const {phoneO,phoneM,openBalance,drcrOption,regDate,email,balance,drcr} = clientSelected

    return (
        
            <div className="container  m-0">
                         <div className = 'row'> 
                             <div className="col-6 col-sm-4">Contact</div>
                             <div className="col-6 col-sm-4">{phoneO}</div>
                         </div>
                         <div className = 'row'> 
                             <div className="col-6 col-sm-4">Cell Phone</div>
                             <div className="col-6 col-sm-4">{phoneM}</div>
                         </div>
                         <div className = 'row'> 
                             <div className="col-6 col-sm-4">Opening Balance</div>
                             <div className="col-6 col-sm-4"> <span>{openBalance}{drcrOption}</span></div>
                         </div>
                         <div className = 'row'> 
                             <div className="col-6 col-sm-4">Reg.Date</div>                             
                             <div className="col-6 col-sm-4">{new Intl.DateTimeFormat("en-GB").format(new Date(regDate))}</div>
                         </div>
                         <Link className="row btn btn-info fs-4 my-2" to = '/client/newclient'>Edit Client</Link>
                         <div className = 'row '> 
                             <div className="col-8 col-sm-6 d-flex  flex-column border border-dark ">
                               <div className="row">
                                   <div className="col-4">
                                       Price List
                                       </div> 
                                        <div className = 'col-8'>
                                            <EmailButton email = {email}/>
                                            <PrintButton/>
                                        </div> 
                               </div>
                                   
                             </div>
                    
                         <div className = 'col-4 '> 
                          <div className="d-flex flex-row">
                                <div className="">Balance : </div>
                                <div style = {drcr?{color:'green'}:{color:'red'}}>{balance}</div>
                          </div>
                             
                         </div>
 
                         </div>
                         
                            
                                <div className = 'row d-flex flex-cloumn  px-2 py-2  border border-dark '>
                                    <div className="d-flex flex-row ">
                                    <div className = ''>Last Invoice : </div>
                                    <div className="">invoice data</div> 
                                    </div>
                                    <div className="d-flex flex-row ">
                                    <div className = ''>Last Payment : </div>
                                    <div className="">Payment data</div> 
                                    </div>
                                    <div className=" py-1 d-flex flex-row border border-dark align-items-center">
                                        <div className="w-50 ">StateMent of Accounts</div>
                                        <PrintButton/>
                                        <EmailButton/>
                                    </div>
                                    <div className=" py-1  d-flex flex-row border border-dark align-items-center">
                                        <div className="w-50 ">Outstanding Invoices</div>
                                        <PrintButton/>
                                        <EmailButton/>
                                    </div>
                                    <div className=" py-1 d-flex flex-row border border-dark align-items-center">
                                        <div className="w-50 ">Billing History</div>
                                        <PrintButton/>
                                        <EmailButton/>
                                    </div>
                                </div>
                         

                     </div>
    
    );
}

export default ClientSummary;