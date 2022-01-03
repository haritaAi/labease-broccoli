import React,{useContext,useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import Menu from '../../menu'
import ClientContext from '../../../context/ClientContext';
import OrderContext from '../../../context/OrderContext';
import UserContext from '../../../context/UserContext';
import Client from '../../../core/Client';
import ClientOrderTable from '../../ClientOrderTable';
import { getNextInvoiceSequence, updateOrder } from '../../../admin/clientApi';
import OrderInInvoiceForm from './OrderInInvoiceForm';
import SubMenuAccounts from '../SubMenuAccounts';
import NewInvoice from './NewInvoice';
import GenerateInvoices from './GenerateInvoices';
import AwaitPaymentInvoices from './AwaitPaymentInvoices';
import PaidInvoice from './PaidInvoice';
import CancelledInvoice from './CancelledInvoice';
import PDFGenerator from '../../print/PDFGenerator';

const Invoice = (props) =>  {
  
const {clients,clientSelected,setClientSelected,onClientSelect} = useContext(ClientContext)  
const {user,token} = useContext(UserContext)
const {orders,fetchOrders} = useContext(OrderContext)  
const [invoiceNumber,setInvoiceNumber] = useState(null)
const [message,setMessage] = useState('')
const [alert,setAlert] = useState(false)
const [showOrderTable,setShowOrderTable] = useState(false)
const [showInvoiceTable,setShowInvoiceTable] = useState(false)
const [ordersSelected,setOrdersSelected]  = useState([])//orders to be invoiced
const [clientOrders,setClientOrders] = useState([])//all uninvoiced orders

const [currentTab,setCurrentTab] = useState(1)



const invoiceSubMenu = ()=>{
    return(
        <div className = 'container-fluid d-flex flex-column  justify-content-end'>
                    <div className="btn btn-info text-white fs-4 my-3 " 
                         style ={currentTab ===1? {backgroundColor:'#0b8df7'} : null} 
                         onClick = {()=>{  setCurrentTab(1)

                    }} >+New Invoice</div>
                    <div className="btn btn-info text-white fs-4 my-3 " 
                         style ={currentTab ===2? {backgroundColor:'#0b8df7'} : null} 
                         onClick = {() => { setCurrentTab(2)
                    }}>
                        Generate Invoices
                    </div>
                    <div className="btn btn-info text-white fs-4 my-3 " 
                         style ={currentTab ===3? {backgroundColor:'#0b8df7'} : null}                         
                         onClick = {() => { setCurrentTab(3)
                    }}>
                        Awaiting Payments
                    </div>
                    <div className="btn btn-info text-white fs-4 my-3 " 
                         style ={currentTab ===4? {backgroundColor:'#0b8df7'} : null} 
                         onClick = {() => { setCurrentTab(4)  
                    }}>
                        Paid Invoices
                    </div>
                    <div className="btn btn-info text-white fs-4 my-3 " 
                         style ={currentTab ===5? {backgroundColor:'#0b8df7'} : null} 
                         onClick = {() => { setCurrentTab(5)
                    }}>
                        Cancelled Invoices
                    </div>
        </div> 
        
    
    )
}


useEffect(()=>{
    setClientSelected(null)
    

},[])
  
    return (
        <div className = ''>
            <Menu />
            <SubMenuAccounts/> 
            <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-md-2">
                        {invoiceSubMenu()}          
         
                        </div>
                       
                        <div className="col-12 col-md-10">
                        {currentTab === 1 && <NewInvoice />}
                        {currentTab === 2 && <GenerateInvoices />}
                        {currentTab === 3 && <AwaitPaymentInvoices />}
                        {currentTab === 4 && <PaidInvoice />}
                        {currentTab === 5 && <CancelledInvoice />}
                        </div>

                        </div>       
                </div>  
            
            
  
        </div>
    );
}

export default Invoice;