import React,{useContext,useState} from 'react';

import { useHistory } from 'react-router-dom';
import ClientContext from  '../../context/ClientContext'
import Menu from '../menu'
import SubMenu from '../../core/SubMenu';

import ClientProfileSummary from './ClientProfileSummary'
import ClientProfileOrder from './ClientProfileOrder';
import ClientProfileInvoiceTable from './ClientProfileInvoiceTable';



const ClientProfilePage = (props) =>  {

 const history = useHistory();

 const {clientSelected} = useContext(ClientContext)
 const [summary,setSummary] = useState(true)
 const [orderTab,setOrderTab] = useState(false)
 const [shipmentTab,setShipmentTab] = useState(false)
 const [invoiceTab,setInvoiceTab] = useState(false)
 const [paymentTab,setPaymentTab] = useState(false)

  




const profileTabs = () => {
 
    return (
        <div className = 'd-flex flex-column flex-sm-row  justify-content-evenly '
             style = {{backgroundColor : 'dodgerblue'}} >
                
                    <div className="btn   text-white fs-3 p-2" 
                        style ={summary? {backgroundColor:'tomato'}:{backgroundColor:'dodgerblue'}} 
                        onClick = {() => {

                                setSummary(true)
                                setShipmentTab(false)
                                setOrderTab(false)
                                setInvoiceTab(false)
                                setPaymentTab(false)
                                }                        

                        } 
                        >Summary </div>
                    
                    <div className="btn  text-white fs-3 p-2"
                        style ={orderTab? {backgroundColor:'tomato'}:{backgroundColor:'dodgerblue'}}
                        onClick = {() => {

                            setSummary(false)
                            setShipmentTab(false)
                            setOrderTab(true)
                            setInvoiceTab(false)
                            setPaymentTab(false)
                                }                        

                        } 
                        >Order </div> 
         
          
                    <div className="btn btn-info  text-white fs-3 p-2"
                            style ={shipmentTab? {backgroundColor:'tomato'}:{backgroundColor:'dodgerblue'}}                    
                            onClick = {() => {

                                setSummary(false)
                                setShipmentTab(true)
                                setOrderTab(false)
                                setInvoiceTab(false)
                                setPaymentTab(false)
                                    }                        

                            } 
                            > Shipment </div> 

                    <div className="btn btn-info  text-white fs-3 p-2"
                            style ={invoiceTab? {backgroundColor:'tomato'}:{backgroundColor:'dodgerblue'}}                    
                            onClick = {() => {
                                    
                                setSummary(false)
                                setShipmentTab(false)
                                setOrderTab(false)
                                setInvoiceTab(true)
                                setPaymentTab(false)
                                    }                        

                            } 
                            > Invoice </div> 

              
           <div className="btn btn-info text-white fs-3 p-2"
                 style ={paymentTab? {backgroundColor:'tomato'}:{backgroundColor:'dodgerblue'}}                    
                 onClick = {() => {
                          
                    setSummary(false)
                    setShipmentTab(false)
                    setOrderTab(false)
                    setInvoiceTab(false)
                    setPaymentTab(true)
                        }                        

                 } 
                 > Payment </div> 

        </div>
    )

}

 
    return (
        <div className = ''>
             <Menu/>
             <div className = 'container '>
                 <SubMenu/>
           
             <div className = 'd-flex flex-column border border-dark px-3 py-3 fs-4 w-100'>

                <div className="btn btn-info fs-4 px-5 align-self-center  w-25" onClick = {()=> history.goBack()}>Back</div>
                <div><b>Client Profile : </b></div>
                { clientSelected && 
                <> 
                 <div className = 'fs-3  '><b> 
                      {(clientSelected.name).toUpperCase()}
                     </b> <span className = 'mx-2'>
                        {clientSelected.code} 
                         </span></div>
                   
                    <hr/>
                    <div>{profileTabs()}</div>
                      {summary &&  <ClientProfileSummary clientSelected = {clientSelected}/>}
                      {orderTab && <ClientProfileOrder clientSelected = {clientSelected}/>}
                      {invoiceTab && <ClientProfileInvoiceTable clientSelected = {clientSelected}/>}
                      
                    </>  }
                  </div>
             </div>
        </div>
    );
}

export default ClientProfilePage;