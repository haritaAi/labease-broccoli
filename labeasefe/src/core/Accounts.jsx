import React,{useState,useEffect,useContext} from 'react';
import { Link } from 'react-router-dom';
import InvoiceContext from '../context/InvoiceContext';
import Menu from '../components/menu'
import AccountOrdersTable from '../components/Accounts/AccountOrderTable'
import InvoiceTable from '../components/Accounts/Invoice/InvoiceTable';
import Invoice from '../components/Accounts/Invoice/Invoice' 
import SubMenuAccounts from '../components/Accounts/SubMenuAccounts'
import {getInvoices} from '../admin/clientApi'
import { useAsyncDebounce } from 'react-table';
import InvoiceDetail from '../components/Accounts/Invoice/InvoiceDetail'


const  Accounts = (props) => {    
  
    const {invoices,fetchInvoices,invoiceSelected,setInvoiceSelected} = useContext(InvoiceContext)
     
     const [message,setMessage] = useState('')
     const [alert,setAlert] = useState(false)
    
     const [showDetail,setShowDetail] = useState(false)



const handleInvoiceSelect = invoice => {

    //    setCurrentInvoice(invoice)
       setInvoiceSelected(invoice)
       setShowDetail(true)
   console.log("Invoice selected : ",invoice)
}


  useEffect(()=>{
   fetchInvoices()
   setInvoiceSelected(null)
  },[])   
  


    return (
        <div >
            <Menu />
           
            <SubMenuAccounts  />
          
                   <div className="container">
                       {alert &&  <div className = 'text-red'><b>{message}</b></div>}                      
                        {!showDetail && invoices.length > 0 &&  <InvoiceTable invoices = {invoices} 
                                                       onInvoiceSelect = {handleInvoiceSelect}                                                     
                                                       path = '/accounts' />}
                        {showDetail && invoiceSelected &&  
                                      <InvoiceDetail invoice = {invoiceSelected} path = '/accounts'/>
                        }
                       </div> 

        </div>
    );
}

export default Accounts;